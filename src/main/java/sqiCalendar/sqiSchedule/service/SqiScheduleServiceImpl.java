package sqiCalendar.sqiSchedule.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import sqiCalendar.sqiSchedule.dto.SqiScheduleDto;
import sqiCalendar.sqiSchedule.entity.SqiScheduleEntity;
import sqiCalendar.sqiSchedule.repository.SqiScheduleRepository;

@Service
@Transactional
public class SqiScheduleServiceImpl implements SqiScheduleService{
	@Autowired
	private SqiScheduleRepository scheduleRepository;

	@Override
	public ResponseEntity<?> getSchedule() {
		// TODO Auto-generated method stub
		List<SqiScheduleEntity> scheduleEntities = scheduleRepository.findAll();
		return ResponseEntity.ok(scheduleEntities);
	}

	@Override
	public SqiScheduleEntity addSchedule(SqiScheduleDto dto) {
		SqiScheduleEntity scheduleEntity = convertToScheduleEntity(dto);
		scheduleRepository.save(scheduleEntity);
		return scheduleEntity;
	}

	@Override
	public SqiScheduleEntity updateSchedule(Integer id, SqiScheduleDto dto) {
		// TODO Auto-generated method stub
		SqiScheduleEntity scheduleEntities = scheduleRepository.findById(id).get();
		scheduleEntities.setTask(dto.getTask());
		scheduleEntities.setApp(dto.getApp());
		scheduleEntities.setFromDate(dto.getFromDate());
		scheduleEntities.setFromTime(dto.getFromTime());
		scheduleEntities.setToDate(dto.getToDate());
		scheduleEntities.setToTime(dto.getToTime());
		scheduleEntities.setColor(dto.getColor());
		return scheduleEntities;
	}

	@Override
	public SqiScheduleEntity deleteSchedule(Integer id) {
		// TODO Auto-generated method stub
		SqiScheduleEntity scheduleEntity = scheduleRepository.findById(id).get();
		scheduleRepository.delete(scheduleEntity);
		return scheduleEntity;
	}
	
	//convertDTO
	public SqiScheduleEntity convertToScheduleEntity(SqiScheduleDto dto) {
		SqiScheduleEntity scheduleEntity = new SqiScheduleEntity();
		scheduleEntity.setTask(dto.getTask());
		scheduleEntity.setApp(dto.getApp());
		scheduleEntity.setFromDate(dto.getFromDate());
		scheduleEntity.setFromTime(dto.getFromTime());
		scheduleEntity.setToDate(dto.getToDate());
		scheduleEntity.setToTime(dto.getToTime());
		scheduleEntity.setColor(dto.getColor());
		return scheduleEntity;
	}

	@Override
	public ResponseEntity<?> getScheduleId(Integer id) {
		// TODO Auto-generated method stub
		SqiScheduleEntity scheduleEntity = scheduleRepository.findById(id).get();
		return ResponseEntity.ok(scheduleEntity);
		
	}
	
}

