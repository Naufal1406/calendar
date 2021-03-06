import React, {Component} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
// import ReactToExcel from 'react-html-table-to-excel';
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/js/responsive.dataTables.js";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import 'datatables.net-buttons/js/buttons.colVis';
import 'datatables.net-buttons/js/buttons.html5';
import 'datatables.net-buttons/js/buttons.flash';
import 'datatables.net-buttons/js/buttons.print';
// import 'jszip/dist/jszip.min.js'
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import Swal from "sweetalert2";
import Axios from "../instance/axios";
import assign from "../assets/img/assignment.png";
import event from "../assets/img/event-available.png";
import edit from "../assets/img/edit.png";
import deleted from "../assets/img/delete.png";

class EventCalender extends Component{
    constructor(props){
        super(props)
        this.state = {
            fields : {},
            errors : {},
            schedule : [],
            number : 1,
            fileName : 'CTS-D Schedule',
            title : [],
            start : [],
            end : [],
            color : [],
            temp : [],
            temporary : []
        }

    }

    componentDidMount(event) {
        this.getSchedule();
        this.getCalendar();
    }

    getSchedule() {
        Axios.get('/sqi-schedule/get-schedule')
        .then((response) => {
            const dataSchedule = response.data;
            this.setState({
                schedule : dataSchedule
            });
            // DATATABLE 
            // $(function() {
                // Setup - add a text input to each footer cell
                $('.filter').each( function (i) {
                    var title = $('#example thead th').eq( $(this).index() ).text();
                    if(title==="application"){
                        $(this).html( '<button type="text" placeholder="Search '+title+'" data-index="'+i+'" />' );
                    } else {
                        $(this).html( '<input type="text" placeholder="Search '+title+'" data-index="'+i+'" />' );
                    }
                    
                } );
            
                // DataTable
                var table = $('#example').DataTable( {
                    scrollY:        "300px",
                    scrollX:        true,
                    scrollCollapse: true,
                    paging:         true,
                    fixedColumns:   true,
                    responsive:     true,
                    dom: 'Bfrtip',
                    buttons: [
                                'excel', 'pdf'
                            ]
                } );
            
                // Filter event handler
                $( table.table().container() ).on( 'keyup', '.filter input', function () {
                    table
                        .column( $(this).data('index') )
                        .search( this.value )
                        .draw();
                } );
            // })
        });
        
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        //Task
        if (!fields["task"]) {
          formIsValid = false;
          errors["task"] = "Task can't be empty";
        }
    
        //Application
        if (!fields["app"]) {
          formIsValid = false;
          errors["app"] = "Application can't be empty";
        }
    
        //Application
        if (!fields["fromDate"]) {
            formIsValid = false;
            errors["fromDate"] = "Date can't be empty";
          }
        
        //Application
        if (!fields["fromTime"]) {
            formIsValid = false;
            errors["fromTime"] = "Time can't be empty";
        }

        //Application
        if (!fields["toDate"]) {
            formIsValid = false;
            errors["toDate"] = "Date can't be empty";
        }

        //Application
        if (!fields["toTime"]) {
            formIsValid = false;
            errors["toTime"] = "Time can't be empty";
        }
    
        this.setState({ errors: errors });
        return formIsValid;
    }

    getScheduleById = (id) => {
        Axios.get('/sqi-schedule/get-scheduleById/' + id)
        .then((response)=>{
            console.log(response.data)
            this.setState({
                id : response.data.id,
                task : response.data.task,
                app : response.data.app,
                fromDate : response.data.fromDate,
                fromTime : response.data.fromTime,
                toDate : response.data.toDate,
                toTime : response.data.toTime,
                color : response.data.color
            });
            
        });
    }

    deleteSchedule = (id) => {
        Axios.delete('/sqi-schedule/delete-schedule/' + id)
        .then((response)=>{
            Swal.fire({
                icon : 'success',
                title : 'Success',
                text : "Your Task Has Been Deleted",
                confrimButtonText : "OK"
            }).then((result)=>{
                if(result.isConfirmed){
                    window.location.reload();
                }
            })
        })
    }

    submitTask(e) {
        e.preventDefault();
        const fields = this.state.fields;
        if(this.handleValidation()){
            // $('#addTaskModal').modal('toggel');

            const schedule = {
                task : fields["task"],
                app : fields["app"][1],
                fromDate : fields["fromDate"],
                toDate : fields["toDate"],
                fromTime : fields["fromTime"],
                toTime :fields["toTime"],
                color : fields["app"][0]
            }
            console.log(schedule);
    
            Axios.post('/sqi-schedule/add-schedule', schedule)
            .then((response)=>{
                Swal.fire({
                    icon : 'success',
                    title : 'Success',
                    text : "Your Task Has Been Added",
                    confrimButtonText : "OK"
                }).then((result)=>{
                    if(result.isConfirmed){
                        window.location.reload();
                    }
                })
            })
        } else {
            Swal.fire({
              icon: 'warning',
              title: 'Sorry !',
              text: 'You Must Fill The Requirement !',
              confirmButtonText: `OK`
            }).then((result) => {
                if(result.isConfirmed) {
                }
            })
    
          }
    }
    
    handleUpdateValidation(){
        let errors = {};
        let formIsValid = true;

        if(this.state.task === ""){
            formIsValid = false;
            errors["task"] = "Task cannot be empty"
        }

        this.setState({ errors : errors});
        return formIsValid;
    }
    // taskSubmit(event){
    //     const fields = this.state.fields;
    //     const schedule = {
    //         task : fields["task"],
    //         app : fields["app"][1],
    //         fromDate : fields["fromDate"],
    //         toDate : fields["toDate"],
    //         fromTime : fields["fromTime"],
    //         toTime :fields["toTime"],
    //         color : fields["app"][0]
    //     }
    //     console.log(schedule);

    //     Axios.post('http://localhost:8080/sqi-schedule/add-schedule', schedule)
    //     .then((response)=>{
    //         Swal.fire({
    //             icon : 'success',
    //             title : 'Success',
    //             text : "Your Task Has Been Added",
    //             confrimButtonText : "OK"
    //         }).then((result)=>{
    //             if(result.isConfirmed){
    //                 window.location.reload();
    //             }
    //         })
    //     });
    // }

    updateSchedule = (id) => {
        const schedule = {
            task : this.state.task,
            app : this.state.app[1],
            fromDate : this.state.fromDate,
            fromTime : this.state.toTime,
            toDate : this.state.toDate,
            toTime : this.state.toTime,
            color : this.state.app[0]
        }
        console.log(schedule);   

        if(this.handleUpdateValidation()){
        Axios.put('/sqi-schedule/update-schedule/' + id, schedule)
        .then((response)=>{
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Your Data Has Been Update',
                confirmButtonText: `OK`
              }).then((result) => {
                  if(result.isConfirmed) {
                    window.location.reload();
                  }
              })
            })
        } else {
            Swal.fire({
              icon: 'warning',
              title: 'Sorry !',
              text: 'You Must Fill The Requirement !',
              confirmButtonText: `OK`
            }).then((result) => {
                if(result.isConfirmed) {
                }
            })
    
          }
    }

    handleUpdateSchedule = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleUpdateApp = (e) => {
        console.log(e);
        this.setState({
            [e.target.name] : e.target.value.split(",")
        })
    }

    handleChange(field, e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleChangeApp(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value.split(",");
        this.setState({ fields });
    }

    getCalendar() {
        Axios.get('/sqi-schedule/get-schedule')
        .then((response)=> {
            const dataSchedule = response.data;

            this.setState({
                temp : dataSchedule
            })
            const temporary = this.state.temp
            this.setState({
                temporary : temporary
            })
        })
    }

    handleEvent = (e) => {
        Axios.get('/sqi-schedule/get-schedule')
        .then((response) => {
            const app = e.target.value;
            const dataSchedule = response.data;
            const temporary = this.state.temp

            this.setState({
                temporary : []
            })

            let filterEvent = [];
            temporary.map((result)=>{               
                if(app === "CRM Halo" && result.app === "CRM Halo"){
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                    
                }if(app === "Halo Lite" && result.app === "Halo Lite"){
                    // console.log("Halo Lite")
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                }if(app === "Halo Apps" && result.app === "Halo Apps"){
                    // console.log("Halo Apps")
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                    console.log(this.state.title)
                }if(app === "Specta" && result.app === "Specta"){
                    // console.log("Specta")
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                    
                }if(app === "Telephony" && result.app === "Telephony"){
                    // console.log("Telephony")
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })

                }if(app === "SOSMED" && result.app === "SOSMED"){
                    
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                }if(app === "Chain" && result.app === "Chain"){
                    

                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                }if(app === "MQA" && result.app === "MQA"){
                    
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                }if(app === "WA Client" && result.app === "WA Client"){
                    
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                }if(app === "Halo Toolkit" && result.app === "Halo Toolkit"){
                    
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })
                }if(app === "Winters" && result.app === "Winters"){
                    
                    filterEvent.push(result);
                    console.log(filterEvent);

                    this.setState({
                        temporary : filterEvent
                    })              
                }if(app === "All") {
                    this.setState({
                        temporary : temporary
                    })
                }
            })
            
        })   
    }

    resetModal = () => {
        let fields = this.state.fields;
        fields["task"] = "";
        fields["app"] = "";
        fields["fromDate"] = "";
        fields["fromTime"] = "";
        fields["toDate"] = "";
        fields["toTime"] = ""

        let errors= {}
        errors["task"] = "";
        errors["app"] = "";
        errors["fromDate"] = "";
        errors["fromTime"] = "";
        errors["toDate"] = "";
        errors["toTime"] = ""

        this.setState({
            fields : fields,
            errors : errors
        });

    }
    render(){
        const { schedule, temporary } = this.state;
        let { number } = this.state;
        return(
            <div className = "content contentSection">
                <section className="titleSection">
                    <div className="titleWeb">                       
                        <h3>
                        <img src={event}></img>
                            CTS-D Calendar
                        </h3>

                    </div>
                </section>

                <section className="contentSection">
                    {/* Add Task Button */}
                    <button type="button" className="btn btn-primary addTask contentSection" data-bs-toggle="modal" data-bs-target="#addTaskModal">
                    <div>
                        {/*<span class="material-icons inputTask" style={{position : "relative"}}>assignment</span> */}
                        <img src={assign}></img>
                    </div>
                    Add Task
                    </button>
                </section>                                          

                {/* Modal Add Task  */}
                <section className="contentSection">
                <div className="modal fade" id="addTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <span class="material-icons inputTask" style={{marginRight : "5px"}}>assignment</span> */}
                            <img src={assign}></img>
                            <h5 className="modal-title" id="exampleModalLabel"> 
                                Add Your Task
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form
                        onSubmit={this.submitTask.bind(this)}
                        >
                            <div className="modal-body">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <div>
                                                    <div className="task col-sm-6">
                                                        <label>Your Task</label>
                                                    </div>
                                                    <div className="task col-md-12">
                                                        <input
                                                        name="task"
                                                        className="col-md-12" 
                                                        placeholder="-- Enter Your Task --"
                                                        onChange={this.handleChange.bind(this, "task")}
                                                        value ={this.state.fields["task"]}
                                                        />
                                                        <span style={{ color: "red", fontSize :"15px"}}>
                                                            {this.state.errors["task"]}
                                                        </span>
                                                    </div>
                                                </div>
                                            
                                            </div>                                
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <div className="application col-sm-6">
                                                    <label>Your Application</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <select 
                                                    className=" application col-sm-12" 
                                                    name="app" 
                                                    // id="appItem"
                                                    onChange={this.handleChangeApp.bind(this, "app")}
                                                    value={this.state.fields["app"]}>                                                        
                                                        <option value="null">-- Choose Application --</option>
                                                        <option className="selectApp" id="crmHalo" value="#62A1F3,CRM Halo">CRM Halo</option>
                                                        <option className="selectApp" id="haloLite" value="#71E263,Halo Lite">Halo Lite</option>
                                                        <option className="selectApp" id="haloApps"value="#F8D49D,Halo Apps">Halo Apps</option>
                                                        <option className="selectApp" id="specta"value="#F8C957,Specta">Specta</option>
                                                        <option className="selectApp" id="telephony" value="#E18FF0,Telephony">Telephony</option>
                                                        <option className="selectApp" id="sosmed" value="#FFAAA5,SOSMED">SOSMED</option>
                                                        <option className="selectApp" id="chain" value="#BAC7A7,Chain">Chain</option>
                                                        <option className="selectApp" id="mqa" value="#D8854F,MQA">MQA</option>
                                                        <option className="selectApp" id="waClient" value="#5EAAA8,WA Client">WA Client</option>
                                                        <option className="selectApp" id="haloToolkit" value="#839B97,Halo Toolkit">Halo Toolkit</option>
                                                        <option className="selectApp" id="winters" value="#70AF85,Winters">Winters</option>
                                                    </select>
                                                    <span style={{ color: "red", fontSize :"15px" }}>
                                                           {this.state.errors["app"]}
                                                    </span>
                                                </div>
                                            </div>                                
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                    <div className="date col-sm-6">
                                                        <label>From</label>
                                                    </div>
                                                    <div className="chooseDate">
                                                        {/* From Date */}
                                                        <input 
                                                        className="fromDate col-sm-6" 
                                                        type="date" 
                                                        name="fromDate" 
                                                        placeholder="Start"
                                                        onChange={this.handleChange.bind(this,"fromDate")}
                                                        value={this.state.fields["fromDate"]}/>
                                                        

                                                        {/* From Time */}
                                                        <input 
                                                        type="time"
                                                        className="fromTime col-sm-3"
                                                        name="fromTime"
                                                        onChange={this.handleChange.bind(this,"fromTime")}
                                                        value={this.state.fields["fromTime"]}/>
                                                                                                                
                                                    </div>
                                                    <span className="col-sm-6" style={{ color: "red", fontSize :"15px" }}>
                                                        {this.state.errors["fromDate"]}
                                                    </span>
                                                    <span className="col-sm-3" style={{ color: "red", fontSize :"15px", paddingLeft : "125px" }}>
                                                            {this.state.errors["fromTime"]}
                                                    </span>                                                                                          
                                            </div>                                
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <div className="date col-sm-6">
                                                    <label>To</label>
                                                </div>
                                                <div className="chooseDate">
                                                    {/* To Date */}
                                                    <input 
                                                    className="toDate col-sm-6" 
                                                    type="date" 
                                                    name="toDate" 
                                                    placeholder="Finish"
                                                    onChange={this.handleChange.bind(this,"toDate")}
                                                    value={this.state.fields["toDate"]}/>
                                                    


                                                    {/* To Time */}
                                                    <input 
                                                        type="time"
                                                        className="fromTime col-sm-3"
                                                        name="toTime"
                                                        onChange={this.handleChange.bind(this,"toTime")}
                                                        value={this.state.fields["toTime"]}/>
                                                    

                                                </div>
                                                <span className="col-sm-6" style={{ color: "red", fontSize :"15px" }}>
                                                        {this.state.errors["toDate"]}
                                                </span>
                                                <span className="col-sm-3" style={{ color: "red", fontSize :"15px", paddingLeft : "125px"  }}>
                                                        {this.state.errors["toTime"]}
                                                </span>
                                                
                                            </div>                                
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.resetModal}>Cancel</button>
                                <button type="submit" className="btn btn-primary" 
                                // onClick={this.taskSubmit.bind(this)}
                                >
                                    Save changes</button>
                            </div>
                        </form> 
                    </div>
                    </div>
                </div>
            </section>
            
            {/* Modal Delete */}
            <section className="contentSection">
                <div className="modal fade" id="deleteTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Delete Task</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        Are you sure to delete this event?
                        </div>
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" onClick={()=> this.deleteSchedule(this.state.id)}>Delete</button>
                        </div>
                    </div>
                    </div>
                </div>
            </section>


            {/* Modal Edit */}
            <section className="contentSection">
                <div className="modal fade" id="updateTaskModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            {/* <span className="material-icons inputTask" style={{marginRight : "5px"}}>assignment</span> */}
                            <img src={assign}></img>
                            <h5 className="modal-title" id="exampleModalLabel"> Edit Your Task</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <div>
                                                    <div className="task col-sm-6">
                                                        <label>Your Task</label>
                                                    </div>
                                                    <div className="task col-md-12">
                                                        <input
                                                        name="task"
                                                        className="col-md-12" 
                                                        placeholder="-- Enter Your Task --"
                                                        onChange={this.handleUpdateSchedule}
                                                        value ={this.state.task}
                                                        />
                                                        <span style={{ color: "red", fontSize :"15px" }}>
                                                            {this.state.errors["task"]}
                                                        </span>
                                                    </div>
                                                </div>
                                            
                                            </div>                                
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <div className="application col-sm-6">
                                                    <label>Your Application</label>
                                                </div>
                                                <div className="col-sm-12">
                                                    <select 
                                                    className=" application col-sm-12" 
                                                    name="app" 
                                                    // id="appItem"
                                                    onChange={this.handleUpdateApp}
                                                    value={this.state.app}>
                                                        <option className="selectApp" style={{ color : 'gray'}} value="null">-- Choose Application --</option>
                                                        <option className="selectApp" value="#62A1F3,CRM Halo">CRM Halo</option>
                                                        <option className="selectApp" value="#71E263,Halo Lite">Halo Lite</option>
                                                        <option className="selectApp" value="#F8D49D,Halo Apps">Halo Apps</option>
                                                        <option className="selectApp" value="#F8C957,Specta">Specta</option>
                                                        <option className="selectApp" value="#E18FF0,Telephony">Telephony</option>
                                                        <option className="selectApp" value="#FFAAA5,SOSMED">SOSMED</option>
                                                        <option className="selectApp" value="#BAC7A7,Chain">Chain</option>
                                                        <option className="selectApp" value="#D8854F,MQA">MQA</option>
                                                        <option className="selectApp" value="#5EAAA8,WA Client">WA Client</option>
                                                        <option className="selectApp" value="#839B97,Halo Toolkit">Halo Toolkit</option>
                                                        <option className="selectApp" value="#70AF85,Winters">Winters</option>
                                                    </select>
                                                    <span style={{color:"red" , fontSize:"15px"}}>Please fill again !</span>
                                                    <span style={{ color: "red", fontSize :"15px" }}>
                                                           {this.state.errors["app"]}
                                                    </span>
                                                </div>
                                            </div>                                
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                    <div className="date col-sm-6">
                                                        <label>From</label>
                                                    </div>
                                                    <div className="chooseDate">
                                                        {/* From Date */}
                                                        <input 
                                                        className="fromDate col-sm-6" 
                                                        type="date" 
                                                        name="fromDate" 
                                                        placeholder="Start"
                                                        onChange={this.handleUpdateSchedule}
                                                        value={this.state.fromDate}/>

                                                        {/* From Time */}
                                                        <input 
                                                        type="time"
                                                        className="fromTime col-sm-3"
                                                        name="fromTime"
                                                        onChange={this.handleUpdateSchedule}
                                                        value={this.state.fromTime}/>
                                                    </div>                                                                                          
                                            </div>                                
                                        </div>

                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <div className="date col-sm-6">
                                                    <label>To</label>
                                                </div>
                                                <div className="chooseDate">
                                                    {/* To Date */}
                                                    <input 
                                                    className="toDate col-sm-6" 
                                                    type="date" 
                                                    name="toDate" 
                                                    placeholder="Finish"
                                                    onChange={this.handleUpdateSchedule}
                                                    value={this.state.toDate}/>

                                                    {/* To Time */}
                                                    <input 
                                                        type="time"
                                                        className="fromTime col-sm-3"
                                                        name="toTime"
                                                        onChange={this.handleUpdateSchedule}
                                                        value={this.state.toTime}/>
                                                </div>
                                                
                                            </div>                                
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={this.resetModal}>Cancel</button>
                                <button type="button" className="btn btn-primary" onClick={()=> this.updateSchedule(this.state.id)}>Save changes</button>
                            </div>
                        </form> 
                    </div>
                    </div>
                </div>
            </section>

            <section className="filterSection contentSection">
                <div className="col-lg-12">
                    <label htmlFor="calendar_view">Filter Applications :</label>
                        <div className="custom-control custom-checkbox" data-filter>
                        <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="all" name="apps" type="radio" value="All" onChange={this.handleEvent}/>All
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="crmhalo" name="apps" type="radio" value="CRM Halo" onChange={this.handleEvent}/>CRM Halo
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="halolite" name="apps" type="radio" value="Halo Lite" onChange={this.handleEvent}/>Halo Lite
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="haloapps" name="apps" type="radio" value="Halo Apps" onChange={this.handleEvent}/>Halo Apps
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="specta" name="apps" type="radio" value="Specta" onChange={this.handleEvent}/>Specta
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="telephony" name="apps" type="radio" value="Telephony" onChange={this.handleEvent}/>Telephony
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="sosmed" name="apps" type="radio" value="SOSMED" onChange={this.handleEvent}/>SOSMED
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="chain" name="apps" type="radio" value="Chain" onChange={this.handleEvent}/>Chain
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="mqa" name="apps" type="radio" value="MQA" onChange={this.handleEvent}/>MQA
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="waClient" name="apps" type="radio" value="WA Client" onChange={this.handleEvent}/>WA Client
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="haloToolkit" name="apps" type="radio" value="Halo Toolkit" onChange={this.handleEvent}/>Halo Toolkit
                            <label className="checkbox-inline filterCalendar"></label>
                                <input className="filterApp" id="winters" name="apps" type="radio" value="Winters" onChange={this.handleEvent}/>Winters            
                        </div>
                </div>                       
            </section>  

            
            <section className="contentSection">
                <FullCalendar
                    id="calendar"
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    headerToolbar= {{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                      }}
                    events = {
                        temporary.map((result)=>{
                            return{
                                title : `${result.task} - ${result.app}`,
                                start : `${result.fromDate}T${result.fromTime}`,
                                end : `${result.toDate}T${result.toTime}`,
                                color : result.color,
                                risk : result.app
                            }
                        })  
                    }
                />
                </section>          
               
               {/* <section>
                   <ReactToExcel
                    className = "btn btn-primary"
                    table = "example"
                    filename = "SQI Schedule"
                    buttonText = "Export to Excel"/>
               </section> */}

                <section id="dataTables" className="contentSection">
                    <table 
                        id="example"
                        className="row-border hover stripe display nowrap"
                        responsive 
                        striped 
                        style={{ width : "100%", border : "3px solid #FAF8F7"}}>
                    <thead>
                        <tr id="filtering">
                            <th className="filter">No.</th>
                            <th className="filter">Application</th>
                            <th className="filter">Task</th>
                            <th className="filter">From Date</th>
                            <th className="filter">To Date</th>
                            <th className="filter">Action</th>
                        </tr>
                        <tr>
                            <th className="header">No.</th>
                            <th className="header">Application</th>
                            <th className="header">Task</th>
                            <th className="header">From Date</th>
                            <th className="header">To Date</th>
                            <th className="header">Action</th>
                        </tr>
                    </thead>
                    <tbody>                            
                        {schedule.map((result)=>{
                            return(
                                <tr>
                                    <td className="data">{number++}</td>
                                    <td>{result.app}</td>
                                    <td>{result.task}</td>
                                    <td className="data">
                                        {`${result.fromDate}`}
                                    </td>
                                    <td className="data">
                                        {`${result.toDate}`}
                                    </td>
                                    <td>
                                        <div className="actionBtn">
                                        <button type="button" className="btn btn-warning action" data-bs-toggle="modal" data-bs-target="#updateTaskModal" onClick={()=> this.getScheduleById(result.id)}><img src={edit} style={{width : "25px", height : "30px"}}></img></button>
                                        <button type="button" className="btn btn-danger action" data-bs-toggle="modal" data-bs-target="#deleteTaskModal" onClick={()=> this.getScheduleById(result.id)}><img src={deleted} style={{width : "25px", height : "30px"}}></img></button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    </table>
                </section>             
                
            </div>
        );
    }
}
export default EventCalender;
