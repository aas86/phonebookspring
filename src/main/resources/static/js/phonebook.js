// Class to represent a row in the seat reservations grid
/*
 function Contact(firstName, lastName, phone) {
 this.firstName = firstName();
 this.lastName = lastName();
 this.phone = phone();
 this.checked = ko.observable(false);
 this.shown = ko.observable(true);
 }

 function contactToString(contact) {
 var note = "(";
 note += contact.firstName + ", ";
 note += contact.lastName + ", ";
 note += contact.phone;
 note += ")";
 return note;
 }

 // Overall viewmodel for this screen, along with initial state
 function PhoneBookModel() {
 var self = this;

 self.validation = ko.observable(false);

 self.serverValidation = ko.observable(false);

 self.firstName = ko.observable("");
 self.lastName = ko.observable("");
 self.phone = ko.observable("");

 self.firstNameError = ko.computed(function () {
 if (self.firstName()) {
 return {
 message: "",
 error: false
 };
 }
 return {
 message: "Поле Имя должно быть заполнено.",
 error: true
 };
 });

 self.lastNameError = ko.computed(function () {
 if (!self.lastName()) {
 return {
 message: "Поле Фамилия должно быть заполнено.",
 error: true
 };
 }
 return {
 message: "",
 error: false
 };
 });

 self.phoneError = ko.computed(function () {
 if (!self.phone()) {
 return {
 message: "Поле Телефон должно быть заполнено.",
 error: true
 };
 }
 var sameContact = _.find(self.rows(), {phone: self.phone()});

 if (sameContact) {
 return {
 message: "Номер телефона не должен дублировать другие номера в телефонной книге.",
 error: true
 };
 }
 return {
 message: "",
 error: false
 };
 });

 self.serverError = ko.observable("");

 self.hasError = ko.computed(function () {
 return self.lastNameError().error || self.firstNameError().error || self.phoneError().error;
 });

 self.rows = ko.observableArray([]);

 // Operations
 self.addContact = function () {
 if (self.hasError()) {
 self.validation(true);
 self.serverValidation(false);
 return;
 }

 var contact = new Contact(self.firstName, self.lastName, self.phone);
 $.ajax({
 type: "POST",
 url: "/phoneBook/rcp/api/v1/addContact",
 dataType: 'json',
 contentType: "application/json; charset=utf-8",
 data: JSON.stringify(contact)
 }).done(function() {
 self.serverValidation(false);
 }).fail(function(ajaxRequest) {
 var contactValidation = $.parseJSON(ajaxRequest.responseText);
 self.serverError(contactValidation.error);
 self.serverValidation(true);
 }).always(function() {
 $.ajax({
 type: "GET",
 url: "/phoneBook/rcp/api/v1/getAllContacts",
 //success: self.getAllSuccessCallback
 success: function (response) {
 var contacts = JSON.parse(response);
 }
 });
 });

 self.firstName("");
 self.lastName("");
 self.phone("");
 self.validation(false);
 };

 self.deleteContact = function () {

 };

 self.getAllSuccessCallback = function (contactListFormServer) {
 var contactListForClient = self.convertContactList(contactListFormServer);
 self.rows(contactListForClient);
 };

 self.convertContactList = function (contactListFormServer) {
 var contactListForClient = [];
 contactListFormServer.forEach(function (contact, i) {
 var contactForClient = {
 id: contact.id,
 firstName: contact.firstName,
 lastName: contact.lastName,
 phone: contact.phone,
 checked: ko.observable(false),
 shown: ko.observable(true),
 number: i + 1
 };
 contactListForClient.push(contactForClient);
 });
 return contactListForClient;
 };
 }

 function openDeleteDialog(title, content, onOk, onCancel) {
 $(".delete-dialog").text(content).dialog({
 autoOpen: false,
 modal: true,
 title: title,
 buttons: {
 "Удалить": function () {
 onOk.call();
 $(this).dialog("close");
 },
 "Отмена": function () {
 if (onCancel) {
 onCancel.call();
 }
 $(this).dialog("close");
 }
 }
 });
 $(".delete-dialog").dialog("open");
 }

 function openAlert(title, content, onOk) {
 $(".alert").text(content).dialog({
 autoOpen: false,
 modal: true,
 title: title,
 buttons: {
 "Ок": function () {
 if (onOk) {
 onOk.call();
 }
 $(this).dialog("close");
 }
 }
 });
 $(".alert").dialog("open");
 }

 $(document).ready(function () {
 var phoneBookModel = new PhoneBookModel();
 ko.applyBindings(phoneBookModel);

 $.ajax({
 type: "GET",
 url: "/phoneBook/rcp/api/v1/getAllContacts",
 success: function (response) {
 var contacts = JSON.parse(response);
 }
 //success: phoneBookModel.getAllSuccessCallback
 });
 });*/

// Class to represent a row in the seat reservations grid
function Contact(firstName, lastName, phone) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
}

function contactToString(contact) {
    var note = "(";
    note += contact.firstName + ", ";
    note += contact.lastName + ", ";
    note += contact.phone;
    note += ")";
    return note;
}


$(document).ready(function () {
    var btn = $("#addContact");
    btn.on("click", function () {
        var firstName = $("#firstName");
        var lastName = $("#lastName");
        var phone = $("#phone");
        var contact = new Contact(firstName.val(), lastName.val(), phone.val());
        $.ajax({
            type: "POST",
            url: "/phoneBook/rcp/api/v1/addContact",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(contact)
        }).done(function (response) {
            //console.log(response);
            //console.log(JSON.parse(response));
            //console.log("Добавилось. Всё ОК");
            //console.log(response);

        }).fail(function (ajaxRequest) {
            var contactValidation = $.parseJSON(ajaxRequest.responseText);
        }).always(function () {
            $.ajax({
                type: "GET",
                url: "/phoneBook/rcp/api/v1/getAllContacts",
                success: function (response) {
                    // var contacts = JSON.parse(response);
                    //drawTable(contacts);
                    drawTable(response);
                }
            });
            //console.log("Всё ОК");
            firstName.val("");
            lastName.val("");
            phone.val("");
        });
    });

    $.ajax({
        type: "GET",
        url: "/phoneBook/rcp/api/v1/getAllContacts",
        success: function (response) {
            // var contacts = JSON.parse(response);
            // drawTable(contacts);
            drawTable(response);
        }
    });
    var drawTable = function (contacts) {
        $(".tbody").find("tr").remove();
        if (!contacts.length == 0) {
            _.each(contacts, function (el, index) {
                var tr = $("<tr class='tr'><td></td><td></td><td></td><td></td><td></td>" +
                    "<td><button class='btn btn-primary delete-btn'  type='button'>" +
                    "Удалить</button></td></tr>");
                tr.find("td:eq(0)").html("<input type=\"checkbox\" class=\"select-me\"/>");
                tr.find("td:eq(1)").text(el.id);
                tr.find("td:eq(2)").text(el.lastName);
                tr.find("td:eq(3)").text(el.firstName);
                tr.find("td:eq(4)").text(el.phone);
                $(".table").find(".tbody").append(tr);
            });
            deleteContact();
        } else {
            return;
        }
    };

    function deleteContact() {
        var deleteBtn = $(".delete-btn");
        deleteBtn.on("click", function () {
            var id = $(this).closest("tr").find("td:eq(1)").text();
            var firstName = $(this).closest("tr").find("td:eq(3)").text();
            var lastName = $(this).closest("tr").find("td:eq(2)").text();
            var phone = $(this).closest("tr").find("td:eq(4)").text();
            var contact = new Contact(firstName, lastName, phone);
            contact.id = id;
            //console.log("Delete Button Pressed");
            $.ajax({
                type: "POST",
                url: "/phoneBook/rcp/api/v1/deleteContact",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(contact)
            }).always(function (response) {
                $.ajax({
                    type: "GET",
                    url: "/phoneBook/rcp/api/v1/getAllContacts",
                    success: function (response) {
                        drawTable(response);
                    }
                })
            });
        });
    }

    var deleteChecked = $("#deleteChecked");
    deleteChecked.on('click', function () {
        var listOfChecked = $(".tbody").find(".select-me");
        var indexList = [];
        var contact = null;
        listOfChecked.each(function (index, e) {
            if ($(e).is(":checked")) {
                //indexList.push($(this).closest("tr").find("td:eq(1)").text());
                var id = $(this).closest("tr").find("td:eq(1)").text();
                var firstName = $(this).closest("tr").find("td:eq(3)").text();
                var lastName = $(this).closest("tr").find("td:eq(2)").text();
                var phone = $(this).closest("tr").find("td:eq(4)").text();
                contact = new Contact(firstName, lastName, phone);
                contact.id = id;
                indexList.push(contact);
                console.log(indexList);
            }

        });
        $.ajax({
            type: "POST",
            url: "/phoneBook/rcp/api/v1/deleteChecked",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(indexList)
           // data: JSON.stringify(indexList)
        }).always(function (response) {
            $.ajax({
                type: "GET",
                url: "/phoneBook/rcp/api/v1/getAllContacts",
                success: function (response) {
                    drawTable(response);
                }
            })
        });

    })
});



