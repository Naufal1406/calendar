package sqiCalendar.sqiSchedule.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sqiCalendar.sqiSchedule.dto.SqiScheduleDto;
import sqiCalendar.sqiSchedule.entity.SqiScheduleEntity;
import sqiCalendar.sqiSchedule.service.SqiScheduleServiceImpl;

@RestController
@RequestMapping("/sqi-schedule")
//@CrossOrigin(origins="http://localhost:3000")
//@CrossOrigin
public class SqiScheduleController {
	
	@Autowired
	SqiScheduleServiceImpl scheduleService;
	
	@GetMapping("/get-schedule")
	public ResponseEntity<?> getSchedule(){
		return scheduleService.getSchedule();
	}
	
	@GetMapping("get-scheduleById/{id}")
	public ResponseEntity<?> getScheduleById(@PathVariable Integer id){
		return scheduleService.getScheduleId(id);
	}
	
	@PostMapping("/add-schedule")
	public ResponseEntity<?> addSchedule(@RequestBody SqiScheduleDto dto){
		SqiScheduleEntity scheduleEntity = scheduleService.addSchedule(dto);
		return ResponseEntity.ok(scheduleEntity);
	}
	
	@PutMapping("/update-schedule/{id}")
	public ResponseEntity<?> updateSchedule(@PathVariable Integer id,
			@RequestBody SqiScheduleDto dto){
		SqiScheduleEntity scheduleEntity = scheduleService.updateSchedule(id, dto);
		return ResponseEntity.ok(scheduleEntity);
		
	}
	
	@DeleteMapping("delete-schedule/{id}")
	public ResponseEntity<?> deleteSchedule(@PathVariable Integer id){
		SqiScheduleEntity scheduleEntity = scheduleService.deleteSchedule(id);
		return ResponseEntity.ok(scheduleEntity);
		
	}
}
