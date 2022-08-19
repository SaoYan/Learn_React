export const formTemplate = {
    name: {
        type: "text",
        useRef: true,
        required: true,
        value: "",
        caption: "Name"
    },
    street: {
        type: "text",
        useRef: false,
        required: true,
        value: "",
        caption: "Address"
    },
    province: {
        type: "select",
        required: true,
        value: "",
        caption: "Province",
        options: [
            {value: "", displayName: ""},
            {value: "AB", displayName: "AB"},
            {value: "BC", displayName: "BC"},
            {value: "MB", displayName: "MB"},
            {value: "NB", displayName: "NB"},
            {value: "NL", displayName: "NL"},
            {value: "NS", displayName: "NS"},
            {value: "NT", displayName: "NT"},
            {value: "NU", displayName: "NU"},
            {value: "ON", displayName: "ON"},
            {value: "PE", displayName: "PE"},
            {value: "QC", displayName: "QC"},
            {value: "SK", displayName: "SK"},
            {value: "YT", displayName: "YT"}
        ]
    },
    city: {
        type: "text",
        useRef: false,
        required: true,
        value: "",
        caption: "City"
    },
    postalCode: {
        type: "text",
        useRef: false,
        required: true,
        pattern: "[A-Z]{1}[0-9]{1}[A-Z]{1} [0-9]{1}[A-Z]{1}[0-9]{1}",
        placeholder: "A0A 0A0",
        value: "",
        caption: "Postal Code"
    },
    email: {
        type: "email",
        useRef: false,
        required: true,
        value: "",
        caption: "Email"
    },
    phone: {
        type: "tel",
        useRef: false,
        required: true,
        pattern: "[0-9]{10}",
        placeholder: "1234567890",
        value: "",
        caption: "Phone"
    },
    delivery : {
        type: "select",
        required: true,
        value: "",
        caption: "Delivery",
        options: [
            {value: "standard", displayName: "Standard (free)"},
            {value: "express", displayName: "Express (+$1)"},
            {value: "priority", displayName: "Priority (+$2.5)"}
        ]
    }
};