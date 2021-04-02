package com.ensolver.todo.repositories;

import com.ensolver.todo.model.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long>, CustomTaskRepository<Task> {
}