package kr.or.connect.reserproject.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@ComponentScan(basePackages = {"kr.or.connect.reserproject.dao","kr.or.connect.reserporject.login.dao","kr.or.connect.reserproject.service.impl"})
@Import({DBConfig.class})
public class ApplicationConfig {

}
