package ru.academits.converter;

import ru.academits.converter.generic.GenericConverter;
import ru.academits.dto.ContactDto;
import ru.academits.entity.Contact;

/**
 * Created by Anna on 10.08.2017.
 */
public interface ContactDtoToContactConverter extends GenericConverter<ContactDto, Contact> {
}
