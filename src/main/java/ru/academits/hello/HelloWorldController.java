package ru.academits.hello;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Anna on 17.07.2017.
 */

@RestController
@RequestMapping("/hello/api/v1")
public class HelloWorldController {

    @RequestMapping(value = "hello", method = RequestMethod.GET)
    public String sayHello(@RequestParam(required = false) String name) {
        return "hello, " + name;
    }

}


