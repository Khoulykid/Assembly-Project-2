var parser1;
start = false;
document.getElementById('play-btn').addEventListener('click', function() {
    document.getElementById('output').value = '';
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
    
    document.getElementById('memory_number').innerHTML=parser.accessesTotal;
    document.getElementById('Miss_number').innerHTML=parser.miss;
    document.getElementById('Hit_number').innerHTML=parser.hit;
    document.getElementById('Hit_ratio').innerHTML=parser.hitRatio;
    document.getElementById('Miss_ratio').innerHTML=parser.missRatio;
    document.getElementById('AMAT').innerHTML = parser.AMAT;
    for (let i = 0; i < parser.cache.length; i++)
        document.getElementById('output').value = document.getElementById('output').value + i + ": " + parser.valbit[i] + ' ' + parser.cache[i] + '\n';

});

document.getElementById('playnext-btn').addEventListener('click', function(){
    if(start == false)
    {
        parser1 = new Parser();
        start = true;
        let code = document.getElementById('code').value;
        let S = document.getElementById('S').value;
        let L = document.getElementById('L').value;
        let N = document.getElementById('N').value;
        let clock = document.getElementById('CT').value;
        parser1.setL(parseInt(L));
        parser1.setS(parseInt(S));
        parser1.setM(parseInt(N));
        parser1.setcacheCycles(parseInt(clock));
        parser1.setAddressString(code);
        parser1.separate_addreses();
        parser1.calcC();
        parser1.mapping_type();
    }
    if(parser1.loopindex < parser1.addresses.length)
    {
        parser1.cache_command();
        document.getElementById('output').value = '';
        for (let i = 0; i < parser1.cache.length; i++)
            document.getElementById('output').value = document.getElementById('output').value + i + ": " + parser1.valbit[i] + ' ' + parser1.cache[i] + '\n';
        document.getElementById('memory_number').innerHTML = parser1.accessesTotal;
        document.getElementById('Miss_number').innerHTML = parser1.miss;
        document.getElementById('Hit_number').innerHTML = parser1.hit;
        document.getElementById('Hit_ratio').innerHTML = parser1.hitRatio;
        document.getElementById('Miss_ratio').innerHTML = parser1.missRatio;
        document.getElementById('AMAT').innerHTML = parser1.AMAT;
        parser1.loopindex++;
    }

})

document.getElementById('stop-btn').addEventListener('click', function(){

    start = false;
    document.getElementById('output').value = '';
    document.getElementById('memory_number').innerHTML = 0;
    document.getElementById('Miss_number').innerHTML = 0;
    document.getElementById('Hit_number').innerHTML = 0;
    document.getElementById('Hit_ratio').innerHTML = 0;
    document.getElementById('Miss_ratio').innerHTML = 0;
    document.getElementById('AMAT').innerHTML = 0;
    for (let prop in parser1) {
        if (parser1.hasOwnProperty(prop)) {
            delete parser1[prop];
        }
    }
})



