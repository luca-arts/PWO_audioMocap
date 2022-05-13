
import mido
import random

print(mido.get_output_names()) # To list the output ports
outport = mido.open_output('rtpmidi:rtpmidi 129:0')
count = 0
msgx = 0
msgy = 64
msgz = 40
while True:
    count = count + 1 
    if (count%1000000 == 0):
        msgx = msgx%127
        msgy = msgy%127
        msgz = msgz%127
        print(msgx)
        msgx = msgx + 1
        msgy = msgy + 1
        msgz = msgz + 1
        
        outport.send(mido.Message('control_change', control=20, value=msgx))
        outport.send(mido.Message('control_change', control=21, value=msgy))
        outport.send(mido.Message('control_change', control=22, value=msgz))
