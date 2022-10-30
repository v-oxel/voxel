

function xor() {
    let input = document.getElementById("input").value;
    let ishexinp = document.getElementById("ishexinp").checked;
    let key = document.getElementById("key").value;
    let ishexkey = document.getElementById("ishexkey").checked;
    let output = document.getElementById("output");
    let ishexout = document.getElementById("ishexout").checked
    let output_str = "";

    let input_int = [];
    let key_int = [];
    let output_int = [];
    if (!ishexinp) {
        for (let i = 0; i < input.length; i++) {
            input_int.push(input.charCodeAt(i));
        }
    } else {
        let intput_str = input.match(/.{4}/g);
        console.log(intput_str);
        for (let i = 0; i < input.length / 4; i++) {
            input_int.push(parseInt(intput_str[i], 16));
            console.log(parseInt(intput_str[i], 16), String.fromCharCode(parseInt(intput_str[i], 16)));
        }
    }

    if (!ishexkey) {
        for (let i = 0; i < key.length; i++) {
            key_int.push(key.charCodeAt(i));
        }
    } else {
        let key_str = key.match(/.{4}/g);
        for (let i = 0; i < key.length / 4; i++) {
            key_int.push(parseInt(key_str[i], 16));
        }
    }

    if (ishexout) {
        for (let i = 0; i < input_int.length; i++) {
            output_int.push(input_int[i] ^ key_int[i % key_int.length]);
            output_str = output_str.concat(hexRep(output_int[i]));
        }
    } else {
        for (let i = 0; i < input_int.length; i++) {
            output_int.push(input_int[i] ^ key_int[i % key_int.length]);
            output_str = output_str.concat(String.fromCharCode(output_int[i]));
        }
    }

    output.value = output_str;
}

function hexRep(number) { return (number + 0x10000).toString(16).substr(-4).toUpperCase(); }