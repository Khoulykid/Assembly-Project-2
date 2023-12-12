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
    
    document.getElementById('memory_number').innerHTML=parser.accessesTotal;
    document.getElementById('Miss_number').innerHTML=parser.miss;
    document.getElementById('Hit_number').innerHTML=parser.hit;
    document.getElementById('Hit_ratio').innerHTML=parser.hitRatio;
    document.getElementById('Miss_ratio').innerHTML=parser.missRatio;
    document.getElementById('AMAT').innerHTML = parser.AMAT;
    document.getElementById('output').value = parser.cache.join('\n');
});

document.getElementById('playnext-btn').addEventListener('click', function(){
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

})



