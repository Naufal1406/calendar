package sqiCalendar.sqiSchedule.entity;

//import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Entity
@Table(name = "sqi_schedule")
public class SqiScheduleEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "task", nullable = false)
	private String task;
	
	@Column(name = "application", nullable = false)
	private String app;
	
	@Column(name = "from_date" , nullable = false)
	private String fromDate;
	
	@Column(name ="from_time", nullable = false)
	private String fromTime;
	
	@Column(name = "to_date", nullable = false)
	private String toDate;
	
	@Column(name ="to_time", nullable = false)
	private String toTime;
	
	@Column(name ="color", nullable = false)
	private String color;

	public SqiScheduleEntity() {
		super();
	}

	public SqiScheduleEntity(Integer id, String task, String app, String fromDate, String fromTime, String toDate,
			String toTime, String color) {
		super();
		this.id = id;
		this.task = task;
		this.app = app;
		this.fromDate = fromDate;
		this.fromTime = fromTime;
		this.toDate = toDate;
		this.toTime = toTime;
		this.color = color;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTask() {
		return task;
	}

	public void setTask(String task) {
		this.task = task;
	}

	public String getApp() {
		return app;
	}

	public void setApp(String app) {
		this.app = app;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getFromTime() {
		return fromTime;
	}

	public void setFromTime(String fromTime) {
		this.fromTime = fromTime;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getToTime() {
		return toTime;
	}

	public void setToTime(String toTime) {
		this.toTime = toTime;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	
	
	
}