# --- Day 14: Docking Data ---
## --- Part One ---

As your ferry approaches the sea port, the captain asks for your help again. The computer system that runs this port isn't compatible with the docking program on the ferry, so the docking parameters aren't being correctly initialized in the docking program's memory.

After a brief inspection, you discover that the sea port's computer system uses a strange [bitmask](https://en.wikipedia.org/wiki/Mask_(computing)) system in its initialization program. Although you don't have the correct decoder chip handy, you can emulate it in software!

The initialization program (your puzzle input) can either update the bitmask or write a value to memory. Values and memory addresses are both 36-bit unsigned integers. For example, ignoring bitmasks for a moment, a line like `mem[8] = 11` would write the value `11` to memory address `8`.

The bitmask is always given as a string of 36 bits, written with the most significant bit (representing `2^35`) on the left and the least significant bit (`2^0`, that is, the `1`s bit) on the right. The current bitmask is applied to values immediately before they are written to memory: a `0` or `1` overwrites the corresponding bit in the value, while an `X` leaves the bit in the value unchanged.

For example, consider the following program:
```
mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0
```
This program starts by specifying a bitmask (`mask = ....`). The mask it specifies will overwrite two bits in every written value: the `2`s bit is overwritten with `0`, and the 64s bit is overwritten with `1`.

The program then attempts to write the value `11` to memory address `8`. By expanding everything out to individual bits, the mask is applied as follows:
```
value:  000000000000000000000000000000001011  (decimal 11)
mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
result: 000000000000000000000000000001001001  (decimal 73)
```
So, because of the mask, the value `73` is written to memory address `8` instead. Then, the program tries to write `101` to address `7`:
```
value:  000000000000000000000000000001100101  (decimal 101)
mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
result: 000000000000000000000000000001100101  (decimal 101)
```
This time, the mask has no effect, as the bits it overwrote were already the values the mask tried to set. Finally, the program tries to write `0` to address `8`:
```
value:  000000000000000000000000000000000000  (decimal 0)
mask:   XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
result: 000000000000000000000000000001000000  (decimal 64)
```
`64` is written to address `8` instead, overwriting the value that was there previously.

To initialize your ferry's docking program, you need the sum of all values left in memory after the initialization program completes. (The entire 36-bit address space begins initialized to the value `0` at every address.) In the above example, only two values in memory are not zero - `101` (at address `7`) and `64` (at address `8`) - producing a sum of `165`.

Execute the initialization program. What is the sum of all values left in memory after it completes? (Do not truncate the sum to 36 bits.)

## --- Part Two ---
The shuttle company is running a contest: one gold coin for anyone that can find the earliest timestamp such that the first bus ID departs at that time and each subsequent listed bus ID departs at that subsequent minute. (The first line in your input is no longer relevant.)

For example, suppose you have the same list of bus IDs as above:
```
7,13,x,x,59,x,31,19
```
An `x` in the schedule means there are no constraints on what bus IDs must depart at that time.

This means you are looking for the earliest timestamp (called `t`) such that:

- Bus ID `7` departs at timestamp `t`.
- Bus ID `13` departs one minute after timestamp `t`.
- There are no requirements or restrictions on departures at two or three minutes after timestamp `t`.
- Bus ID `59` departs four minutes after timestamp `t`.
- There are no requirements or restrictions on departures at five minutes after timestamp `t`.
- Bus ID `31` departs six minutes after timestamp `t`.
- Bus ID `19` departs seven minutes after timestamp `t`.

The only bus departures that matter are the listed bus IDs at their specific offsets from `t`. Those bus IDs can depart at other times, and other bus IDs can depart at those times. For example, in the list above, because bus ID `19` must depart seven minutes after the timestamp at which bus ID `7` departs, bus ID `7` will always also be departing with bus ID `19` at seven minutes after timestamp `t`.

In this example, the earliest timestamp at which this occurs is `1068781`:
```
time     bus 7   bus 13  bus 59  bus 31  bus 19
1068773    .       .       .       .       .
1068774    D       .       .       .       .
1068775    .       .       .       .       .
1068776    .       .       .       .       .
1068777    .       .       .       .       .
1068778    .       .       .       .       .
1068779    .       .       .       .       .
1068780    .       .       .       .       .
1068781    D       .       .       .       .
1068782    .       D       .       .       .
1068783    .       .       .       .       .
1068784    .       .       .       .       .
1068785    .       .       D       .       .
1068786    .       .       .       .       .
1068787    .       .       .       D       .
1068788    D       .       .       .       D
1068789    .       .       .       .       .
1068790    .       .       .       .       .
1068791    .       .       .       .       .
1068792    .       .       .       .       .
1068793    .       .       .       .       .
1068794    .       .       .       .       .
1068795    D       D       .       .       .
1068796    .       .       .       .       .
1068797    .       .       .       .       .
```
In the above example, bus ID `7` departs at timestamp `1068788` (seven minutes after `t`). This is fine; the only requirement on that minute is that bus ID `19` departs then, and it does.

Here are some other examples:

- The earliest timestamp that matches the list `17,x,13,19` is `3417`.
- `67,7,59,61` first occurs at timestamp `754018`.
- `67,x,7,59,61` first occurs at timestamp `779210`.
- `67,7,x,59,61` first occurs at timestamp `1261476`.
- `1789,37,47,1889` first occurs at timestamp `1202161486`.

However, with so many bus IDs in your list, surely the actual earliest timestamp will be larger than `100000000000000`!

What is the earliest timestamp such that all of the listed bus IDs depart at offsets matching their positions in the list?
