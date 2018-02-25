package uy.com.equital.efactura.application.config;

import org.springframework.cloud.netflix.feign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients(basePackages = "uy.com.equital.efactura.application")
public class FeignConfiguration {

}
