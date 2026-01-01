package com.example.admin;

import com.example.admin.config.TestFirebaseConfig;
import com.example.admin.controller.AnnouncementController;
import com.example.admin.controller.AssignmentController;
import com.example.admin.controller.ClassroomController;
import com.example.admin.controller.UserController;
import com.example.admin.service.AnnouncementService;
import com.example.admin.service.AssignmentService;
import com.example.admin.service.ClassroomService;
import com.example.admin.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(
    properties = {
        "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
    },
    classes = {VivaAdminPanelApplicationTests.TestConfig.class, VivaAdminPanelApplication.class},
    webEnvironment = SpringBootTest.WebEnvironment.NONE
)
@ActiveProfiles("test")
@Import(TestFirebaseConfig.class)
class VivaAdminPanelApplicationTests {

    @Configuration
    static class TestConfig {
        @Bean
        public UserService userService() {
            return Mockito.mock(UserService.class);
        }

        @Bean
        public ClassroomService classroomService() {
            return Mockito.mock(ClassroomService.class);
        }

        @Bean
        public AssignmentService assignmentService() {
            return Mockito.mock(AssignmentService.class);
        }

        @Bean
        public AnnouncementService announcementService() {
            return Mockito.mock(AnnouncementService.class);
        }

        @Bean
        public UserController userController(UserService userService) {
            return new UserController(userService);
        }

        @Bean
        public ClassroomController classroomController(ClassroomService classroomService) {
            return new ClassroomController(classroomService);
        }

        @Bean
        public AssignmentController assignmentController(AssignmentService assignmentService) {
            return new AssignmentController(assignmentService);
        }

        @Bean
        public AnnouncementController announcementController(AnnouncementService announcementService) {
            return new AnnouncementController(announcementService);
        }
    }

    @Test
    void contextLoads() {
    }
}