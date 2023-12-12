

let directm = true;
let nset = false;
let fass = false;

document.getElementById('directbutton').addEventListener('click', function() {
    directm = true; nset = false; fass = false;
});

document.getElementById('nassbutton').addEventListener('click', function() {
    directm = false; nset = true; fass = false;
});

document.getElementById('fassbutton').addEventListener('click', function() {
    directm = false; nset = false; fass = true;
});

document.getElementById('play-btn').addEventListener('click', function() {
    let code = document.getElementById('code').value;
    let S = document.getElementById('S').value;
    let L = document.getElementById('L').value;
    let N = document.getElementById('N').value;
    let clock = document.getElementById('CT').value;
    parser = new Parser();
    parser.setL(parseInt(L));
    parser.setS(parseInt(S));
    parser.setM(parseInt(N));
    parser.setcacheCycles(parseInt(clock));
    parser.setAddressString(code);
    parser.separate_addreses();
    parser.calcC();
    parser.mapping_type();
    parser.cache_per_address();
    document.getElementById('output').value = "Hello\n";
    document.getElementById('memory_number').innerHTML=parser.accessesTotal;
    document.getElementById('Miss_number').innerHTML=parser.miss;
    document.getElementById('Hit_number').innerHTML=parser.hit;


});

