
export class Parser 
{
    l = 0; //block size
    s = 0; //cache size
    m = 0; //associativity
    c = 0; // number of blocks 
    cacheCycles = 1;
    AMAT = 0.0;
    miss = 0;
    hit = 0;
    accessesTotal = 0;
    hitRatio = 0.0;
    missRatio = 0.0;
    tagSize = 0; // num tag bits
    indexSize = 0; // num index bits
    offsetSize = 0;// num offset bits
    AddressString = ""; // addresses provided by userin a string 
    addresses = []; // array of addresses
    cache = []; // cache structure 
    validity = []; // validity of each cache element

    constructor (l, s, m , addstr, cacheCycles)
    {
        if(l !== undefined)
            this.setL(l);
        if(m !== undefined)
            this.setM(m);
        if(s !== undefined)
            this.setS(s);
        if(addstr !== undefined)
            this.setAddressString(addstr);
        if(cacheCycles !== undefined)
            this.setcacheCycles(cacheCycles);
        this.calcC();
    }
    setL(l)
    {
        if (typeof l == "int")
            if(l >=0 && l <= Number.MAX_SAFE_INTEGER)
             this.l = parseInt(l);
        else
            return false;
    }
    setM(m)
    {
        if (typeof m == "int")
            if( m >= 1 && m <= 8) 
                this.m = parseInt(m);
            else
                return false;
        else
            return false;
    }
    setL(s)
    {
        if (typeof s == "int")
            if(s >=0 && s <= Number.MAX_SAFE_INTEGER)
                this.s = parseInt(s);
        else
            return false;
    }
    setcacheCycles(cacheCycles)
    {
        if (typeof cacheCycles == "int")
            if(cacheCycles >=1 && cacheCycles <= 10)
                this.cacheCycles = cacheCycles;
        else
            return false;
    }
    setAddressString(addstr)
    {
        let arr = addstr.replaceAll(" ", "").split("\n");
        for( let i =0 ; i < arr.length() ; i++)
        {
            if(parseInt(arr[i]) < 0 || parseInt(arr[i]) > 16777216)
                return false;
        }
        this.AddressString = addstr;
    }
    separate_addreses()
    {
        this.addresses = this.AddressString.replaceAll(" ", "").split("\n");
    }
    calcC()
    {
        this.c = this.s/this.l ;
    }
    mapping_type()
    {
        this.offsetSize = Math.log2(this.l);
        let index = this.c/this.m ; 
        if( this.m == this.c) //FULL ASSOCIATIVE
        {
            this.tagSize = 24 - this.offsetSize;
        }
        else
        {
            this.indexSize = Math.log2(index);
            this.tagSize = 24 - this.indexSize - this.offsetSize ;
        }
        
        this.cache = new Array(index);
        this.validity = new Array(index);
        for (let i = 0; i < index ; i++) 
        {
            this.cache[i] = new Array(m).fill(''); 
            this.validity[i] = new Array(m).fill(false);
        }
    }
    getRandomNumberInRange(m) 
    {
        return Math.floor(Math.random() * m);
    }
    cache_per_address()
    {
        for(let i = 0; i < this.addresses.length() ; i++)
        {
            let tag = "";
            let index = "";
            let offset = "";
            let binaryaddress = this.addresses[i].toString(2); // Convert to binary
            let blockNumber = binaryaddress.substring(0,(this.indexSize + this.tagSize)); 
            if(this.indexSize == 0) //FULL ASSOCIATIVE
            {
                tag = blockNumber;
                offset = binaryaddress.substring(this.tagSize);
            }
            else
            {
                tag = blockNumber.substring(0,this.tagSize); 
                index = blockNumber.substring(this.tagSize, this.indexSize + this.tagSize);
                offset = binaryaddress.substring(this.indexSize + this.tagSize);
            }
            let k = parseInt(index, 2); //getting index of the currect address in decimal
            let missC = 0; 

            for(let j = 0; j < m ; j++) // loop over set associativity
            {   
                if(this.validity[k][j])//if validity is true
                {
                    if(tag == this.cache[k][j]) // if it is already in cache
                        this.hit = this.hit +1; // it is a hit
                    else // if it is not in cache
                    {
                        missC = missC + 1; // to see if all of them are misses
                    }
                }
                else
                {
                    this.miss = this.miss + 1; //since we fill in one by one so if it is not valid then it is not found
                    this.cache[k][j] = tag; // fill in the cache w/ tag
                    this.validity[k][j] = true; //validity is true
                }
            }

            if(missC == m) //if the address was not found in the corresponding set @ all
            {
                let randomNum = getRandomNumberInRange(m);
                this.cache[k][randomNum] = tag; // fill in the cache w/ tag
                this.miss = this.miss + 1; // it is a miss
            }
            //displaying cache and validity before end each loop using next instruction button idk you do you
            
        }
        this.accessesTotal = this.miss + this.hit ;
        this.hitRatio = this.hit / this.accessesTotal;
        this.missRatio = this.miss / this.accessesTotal;
        this.AMAT = this.cacheCycles + (this.missRatio * 120);
    }
}