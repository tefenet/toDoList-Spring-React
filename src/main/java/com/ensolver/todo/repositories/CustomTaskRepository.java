package com.ensolver.todo.repositories;

import com.ensolver.todo.model.Task;

public interface CustomTaskRepository<T>{
    <S extends T> S save(S entity);

    Iterable<Task> findAll();
}
