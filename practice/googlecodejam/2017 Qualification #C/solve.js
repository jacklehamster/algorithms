function solve(stalls,person) {
    stalls = parseInt(stalls);
    person = parseInt(person);

    var big = 1;
    var small = 0;
    var bigSize = stalls;

    var count = 1;
    while(bigSize>1) {
        if(person <= big+small) {
            bigSize--;
            if(person<=big) {
                return Math.ceil(bigSize/2)+" "+Math.floor(bigSize/2);
            } else {
                return Math.ceil((bigSize-1)/2)+" "+Math.floor((bigSize-1)/2);
            }
        }
        console.log(bigSize, bigSize-1,big,small);
        var countBig = big;
        var countSmall = small;
        if(bigSize % 2===1) {
            big += countBig + countSmall;
//            small += countSmall;
        } else {
//            big += countSmall;
            small += countBig + countSmall;
        }
        bigSize = Math.floor(bigSize/2);
        person-=count;
        count*=2;
    }
    return "0 0";


    console.log(stalls, person);
    return null;
}

/*
O.OX.O 4 => 2,1 => 2
OX.O..O 5 => 2,2 => 2
O..O.X.O 6 => 2,3 => 3
O................O => 16
O.......O........O => 7,8 => 8 (1), 7 (1)
O...O...O...O....O => 3,4 => 4 (1), 3 (3)
O.O.O.O.O.O.O.O..O => 1,2 => 2 (1), 1 (7)

0.................0 => 17
O........O........O => 8,8 => 8 (2)
O...O....O...O....O => 3,4 => 4 (2), 3 (2)
O.O.O.O..O.O.O.O..O => 1,2 => 2 (2), 6 (1)
 */
