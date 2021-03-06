package ru.academits.converter.impl;

import org.springframework.stereotype.Service;
import ru.academits.converter.ContactDtoToContactConverter;
import ru.academits.dto.ContactDto;
import ru.academits.entity.Contact;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Anna on 10.08.2017.
 */

@Service
public class ContactDtoToContactConverterImpl implements ContactDtoToContactConverter {

    @Override
    public Contact convert(ContactDto contactDto) {
        Contact contact = new Contact();
        contact.setId(contactDto.getId());
        contact.setFirstName(contactDto.getFirstName());
        contact.setLastName(contactDto.getLastName());
        contact.setPhone(contactDto.getPhone());
        return contact;
    }

    @Override
    public List<Contact> convert(List<ContactDto> sourceList) {
        return sourceList.stream().map((contactDto) -> convert(contactDto)).collect(Collectors.toList());
    }
}
