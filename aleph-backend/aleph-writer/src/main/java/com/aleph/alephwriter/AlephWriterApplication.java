package com.aleph.alephwriter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AlephWriterApplication {

	public static void main(String[] args) {
		SpringApplication.run(AlephWriterApplication.class, args);
	}

	@GetMapping("/")
	public String greet() {
		return "hello";
	}
}
