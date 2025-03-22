package com.onlineelection.system.RegisterationService.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.onlineelection.system.RegisterationService.Entity.ElectionComNominees;
import com.onlineelection.system.RegisterationService.Service.ElectionComNomineesService;
import com.onlineelection.system.UserModelService.Entity.Account;
import com.onlineelection.system.UserModelService.DTO.RegisterAccountDTO;
import com.onlineelection.system.RegisterationService.Service.VoterService;
import com.onlineelection.system.UserModelService.Service.AccountService;

@RestController
@RequestMapping("/electioncom")
public class ElectionComController {

    @Autowired
    private ElectionComNomineesService committeeRegistrationService;
    @Autowired
    private AccountService accountService;
    @Autowired
    private VoterService voterService;

    @PostMapping("/nominees")
    public ResponseEntity<String> registerNominee(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("yearOfStudy") String yearOfStudy,
            @RequestParam("studentId") String studentId,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("email") String email, // Added email parameter
            @RequestParam("committeeDescription") String committeeDescription) {

        try {
            // Create a new committee registration object
            ElectionComNominees committeeRegistration = new ElectionComNominees();
            boolean isExistingAccount = accountService.checkExistingStudentId(studentId);

            // Check if studentId is provided
            if (studentId != null && isExistingAccount) {
                // Validate if the studentId exists
                boolean isValidStudent = voterService.checkExistingStudentId(studentId);
                if (!isValidStudent) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Student ID does not exist.");
                }
            }

            // Set the details for the committee registration
            committeeRegistration.setFirstName(firstName);
            committeeRegistration.setLastName(lastName);
            committeeRegistration.setYearOfStudy(yearOfStudy);
            committeeRegistration.setStudentId(studentId);
            committeeRegistration.setPhoneNumber(phoneNumber);
            committeeRegistration.setCommitteeDescription(committeeDescription);

            // Create an account for the nominee
            RegisterAccountDTO account = new RegisterAccountDTO();
            account.setStudentId(studentId);
            account.setRole("ELECTIONCOMMITTEE"); // Corrected the role spelling
            account.setPassword(firstName); // It's advisable to hash the password
            account.setEmail(email); // Set the email

            // Save the account
            accountService.saveAccount(account);

            // Save the committee registration
            committeeRegistrationService.saveCommitteeRegistration(committeeRegistration);

            return ResponseEntity.status(HttpStatus.CREATED).body("Registration successful!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed: " + e.getMessage());
        }
    }
}
