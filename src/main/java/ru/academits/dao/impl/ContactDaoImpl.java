package ru.academits.dao.impl;

import org.springframework.stereotype.Repository;
import ru.academits.dao.ContactDao;
import ru.academits.entity.Contact;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by Anna on 17.06.2017.
 */
@Repository
public class ContactDaoImpl implements ContactDao {
    private List<Contact> contactList = new ArrayList<>();
    private AtomicInteger idSequence = new AtomicInteger(0);

    public ContactDaoImpl() {
        Contact contact = new Contact();
        contact.setId(getNewId());
        contact.setFirstName("Иван");
        contact.setLastName("Иванов");
        contact.setPhone("9123456789");
        contactList.add(contact);
    }

    private int getNewId() {
        return idSequence.addAndGet(1);
    }


    @Override
    public List<Contact> getAllContacts() {
        return contactList;
    }

    @Override
    public void add(Contact contact) {
        contact.setId(getNewId());
        contactList.add(contact);
    }

    @Override
    public void delete(Contact contact) {
        //int i = contact.getId();
        contactList.stream().filter(x -> x.getId() >= contact.getId()).forEach(x -> x.setId(x.getId() - 1));
        //Сначала отфильтровали (взяли все контакты, которые после удаляемого)
        //Потом у них у всех уменьшили id на 1
        contactList.remove(contact.getId() - 1);
        idSequence.decrementAndGet();
    }

    @Override
    public void deleteChecked(List<Contact> contacts) {
        contactList.removeAll(contacts);
        for (int i = 0; i < contacts.size(); i++) {
            idSequence.decrementAndGet();
        }
        // заного проставляем id всем контактам
        for (int i = 0, j = 1; i < contactList.size(); i++, j++) {
            contactList.get(i).setId(j);
        }

    }
}
