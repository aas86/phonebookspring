package ru.academits.converter.impl;

import org.springframework.stereotype.Service;
import ru.academits.converter.ContactToContectDtoConverter;
import ru.academits.dto.ContactDto;
import ru.academits.entity.Contact;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Anna on 10.08.2017.
 */
@Service
public class ContactToContactDtoConverterImpl implements ContactToContectDtoConverter {

    @Override
    public ContactDto convert(Contact contact) {
        ContactDto contactDto = new ContactDto();
        contactDto.setId(contact.getId());
        contactDto.setFirstName(contact.getFirstName());
        contactDto.setLastName(contact.getLastName());
        contactDto.setPhone(contact.getPhone());
        return contactDto;
    }

    @Override
    public List<ContactDto> convert(List<Contact> sourceList) {
        return sourceList.stream().map(this::convert).collect(Collectors.toList());
    }
}
