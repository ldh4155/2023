package com.ilgoojo.backend.service;

import com.ilgoojo.backend.dto.MessageDetailDto;
import com.ilgoojo.backend.dto.MessageDto;
import com.ilgoojo.backend.dto.SendMessageDto;
import com.ilgoojo.backend.entity.Member;
import com.ilgoojo.backend.entity.Message;
import com.ilgoojo.backend.repository.MemberRepository;
import com.ilgoojo.backend.repository.MessageRepository;
import com.ilgoojo.backend.util.DateUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;

    public MessageService(MessageRepository messageRepository, MemberRepository memberRepository) {
        this.messageRepository = messageRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public MessageDto sendMessage(SendMessageDto sendMessageDto, String sendId) {
        Member receiveMember = memberRepository.findByNickName(sendMessageDto.getReceiveMember());
        Member sendMember = memberRepository.findById(sendId)
                .orElseThrow(()-> new NoSuchElementException("사용자 찾을 수 없음"));

        if(receiveMember != null) {
            Message message = new Message(
                    sendMember,receiveMember,
                    sendMessageDto.getTitle(), sendMessageDto.getText());

            messageRepository.save(message);

            return MessageDto.builder()
                    .title(message.getTitle())
                    .text(message.getText())
                    .sendMember(message.getSendMember().getNickName())
                    .receiveMember(message.getReceiveMember().getNickName())
                    .sendTime(DateUtil.FormatDate(message.getCreateTime()))
                    .build();
        } else
            return null;
    }

    public boolean checkNickName(String nickName, String id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(()-> new NoSuchElementException("사용자 찾을 수 없음"));

        System.out.println("nickName: " + nickName + " my NickName: " + member.getNickName());
        if(nickName.equals(member.getNickName())) //자기 자신에게 쪽지를 보내려 하는 경우
            return  false;
        else
            return true;
    }

    //보낸 쪽지함
    public List<MessageDto> getSendMessages(String sendId) {
        List<Message> messages = messageRepository.findBySendMemberId(sendId);
        List<MessageDto> messageDtoList = new ArrayList<>();

        for (Message message : messages) {
            if(!message.getDeleteBySender()) {
                MessageDto messageDto = MessageDto.builder()
                        .id(message.getId())
                        .title(message.getTitle())
                        .text(message.getText())
                        .sendMember(message.getSendMember().getNickName())
                        .receiveMember(message.getReceiveMember().getNickName())
                        .sendTime(DateUtil.FormatDate(message.getCreateTime()))
                        .build();

                messageDtoList.add(messageDto);
            }
        }
        return messageDtoList;
    }

    //받은 쪽지함
    public List<MessageDto> getReceiveMessages(String receiveId) {
        List<Message> messages = messageRepository.findByReceiveMemberId(receiveId);
        List<MessageDto> messageDtoList = new ArrayList<>();

        for (Message message : messages) {
            if(!message.getDeleteByReceiver()) {
                MessageDto messageDto = MessageDto.builder()
                        .id(message.getId())
                        .title(message.getTitle())
                        .text(message.getText())
                        .sendMember(message.getSendMember().getNickName())
                        .receiveMember(message.getReceiveMember().getNickName())
                        .sendTime(DateUtil.FormatDate(message.getCreateTime()))
                        .build();

                messageDtoList.add(messageDto);
            }
        }
        return messageDtoList;
    }

    @Transactional
    public Boolean deleteMessageBySender(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("쪽지를 찾을 수 없습니다"));

        message.setDeleteBySender(true);
        if(message.isDelete())
            messageRepository.delete(message);
        else
            messageRepository.save(message);

        return true;
    }

    @Transactional
    public Boolean deleteMessageByReceiver(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("쪽지를 찾을 수 없습니다"));

        message.setDeleteByReceiver(true);
        if(message.isDelete())
            messageRepository.delete(message);
        else
            messageRepository.save(message);

        return true;
    }

    public MessageDetailDto showMessageDetail(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("쪽지를 찾을 수 없습니다."));

        return MessageDetailDto.builder()
                .sendMember(message.getSendMember().getNickName())
                .receiveMember(message.getReceiveMember().getNickName())
                .title(message.getTitle())
                .text(message.getText())
                .sendTime(DateUtil.FormatDate(message.getCreateTime()))
                .build();
    }

}
