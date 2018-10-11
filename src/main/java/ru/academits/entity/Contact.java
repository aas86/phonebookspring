package ru.academits.entity;

import java.util.Objects;

public class Contact {
    private int id;
    private String firstName;
    private String lastName;
    private String phone;
    private boolean important;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isImportant() {
        return important;
    }

    public void setImportant(boolean important) {
        this.important = important;
    }

    @Override
    public int hashCode() {
        final int prime = 77;
        int hash = 1;
        hash = prime * hash + id;
        hash = prime * hash + firstName.hashCode();
        hash = prime * hash + lastName.hashCode();
        hash = prime * hash +phone.hashCode();
        return hash;
    }

    @Override
    public boolean equals(Object o){
        if (o == this){
            return true;
        }
        if (o == null || o.getClass() != this.getClass()){
            return false;
        }
        Contact obj = (Contact) o;
        return this.id == obj.id && Objects.equals(this.lastName, obj.lastName)
                && Objects.equals(this.firstName, obj.firstName) && Objects.equals(this.phone, obj.phone);
    }
}
