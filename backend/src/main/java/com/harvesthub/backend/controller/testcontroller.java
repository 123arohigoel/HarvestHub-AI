package com.harvesthub.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testcontroller {

    @GetMapping("/api/test")
    public String testConnection() {
        return "HarvestHub backend is working!";
    }
}