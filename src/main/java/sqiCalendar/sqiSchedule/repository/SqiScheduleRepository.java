package sqiCalendar.sqiSchedule.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import sqiCalendar.sqiSchedule.entity.SqiScheduleEntity;


@Repository
public interface SqiScheduleRepository extends JpaRepository<SqiScheduleEntity, Integer> {
	
}
