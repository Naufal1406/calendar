package sqiCalendar.sqiSchedule.service;

import org.springframework.http.ResponseEntity;

import sqiCalendar.sqiSchedule.dto.SqiScheduleDto;
import sqiCalendar.sqiSchedule.entity.SqiScheduleEntity;

public interface SqiScheduleService {
	ResponseEntity<?> getSchedule();
	ResponseEntity<?> getScheduleId(Integer id);
	SqiScheduleEntity addSchedule(SqiScheduleDto dto);
	SqiScheduleEntity updateSchedule(Integer id, SqiScheduleDto dto);
	SqiScheduleEntity deleteSchedule(Integer id);
}
