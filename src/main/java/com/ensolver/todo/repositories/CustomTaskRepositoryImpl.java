package com.ensolver.todo.repositories;

import com.ensolver.todo.model.Task;
import com.ensolver.todo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.EntityManager;

public class CustomTaskRepositoryImpl implements CustomTaskRepository<Task> {

    @Autowired
    private EntityManager entityManager;
    @Autowired
    private UserRepository userRepository;

    @Override
    public <S extends Task> S save(S entity) {
        ((Task)entity).setUser(getCurrentUser());
        this.entityManager.persist(entity);
        return entity;
    }

    @Override
    public Iterable<Task> findAll(){
        return getCurrentUser().getTasks();
    };

    private User getCurrentUser(){
         Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
         String username;
         if (principal instanceof UserDetails) {
             username = ((UserDetails)principal).getUsername();
         } else {
             username = principal.toString();
         }
         return userRepository.findByUsername(username);
    }
}
