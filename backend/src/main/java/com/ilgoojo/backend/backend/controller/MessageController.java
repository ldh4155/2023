package com.ilgoojo.backend.controller;

import com.ilgoojo.backend.dto.MessageDto;
import com.ilgoojo.backend.dto.SendMessageDto;
import com.ilgoojo.backend.service.MessageService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/message/write")
    public ResponseEntity<?> sendMessage(@RequestBody SendMessageDto sendMessageDto) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        MessageDto messageDto = messageService.sendMessage(sendMessageDto, authentication.getName());
        if(messageDto != null)
            return new ResponseEntity<>(messageDto, HttpStatus.CREATED);
        else
            return  new ResponseEntity<>("받는 사람 닉네임을 확인해주세요", HttpStatus.BAD_REQUEST);

    }

    @GetMapping("/message/check")
    public ResponseEntity<?> checkNickName(@RequestParam String nickName) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!messageService.checkNickName(nickName, authentication.getName()))
            return new ResponseEntity<>("자기 자신에겐 쪽지 보내기 불가능", HttpStatus.NO_CONTENT); //204
        else
            return new ResponseEntity<>("성공", HttpStatus.CREATED); //201
    }


    @GetMapping("/message/sent")
    public ResponseEntity<?> getSendMessages() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new ResponseEntity<>(messageService.getSendMessages(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("/message/received")
    public ResponseEntity<?> getReceiveMessages() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return new ResponseEntity<>(messageService.getReceiveMessages(authentication.getName()),HttpStatus.OK);
    }

    @GetMapping("/message/{id}")
    public ResponseEntity<?> showMessageDetail(@PathVariable Long id) {
        return new ResponseEntity<>(messageService.showMessageDetail(id),HttpStatus.OK);
    }


    @DeleteMapping("/message/sent/{id}")
    public ResponseEntity<?> deleteMessageBySender(@PathVariable Long id) {
        return new ResponseEntity<>(messageService.deleteMessageBySender(id), HttpStatus.OK);
    }

    @DeleteMapping("/message/received/{id}")
    public ResponseEntity<?> deleteMessageByReceiver(@PathVariable Long id) {
        return new ResponseEntity<>(messageService.deleteMessageByReceiver(id), HttpStatus.OK);
    }
}