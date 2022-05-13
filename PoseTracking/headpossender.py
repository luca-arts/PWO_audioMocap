# TechVidvan Human pose estimator
# import necessary packages
import mido
import cv2
import mediapipe as mp
import random



print(mido.get_output_names()) # To list the output ports


outport = mido.open_output('rtpmidi:rtpmidi 128:0')
# outport = mido.open_output('Midi Through:Midi Through Port-0 14:0')
# initialize Pose estimator
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

pose = mp_pose.Pose(
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5)

# create capture object
# cap = cv2.VideoCapture('video.mp4')

cap = cv2.VideoCapture(0)


while cap.isOpened():
    # read frame from capture object
    _, frame = cap.read()

    try:
        # convert the frame to RGB format
        RGB = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # process the RGB frame to get the result
        results = pose.process(RGB)

        # print(dir.results)

        # print(results.pose_world_landmarks.landmark)
        # print("x =",results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].x)
        # print("y = ", results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].y)
        # print("z = ",results.pose_landmarks.landmark[mp_pose.PoseLandmark.NOSE].z)
    
        msgxl = int((results.pose_world_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].x +0.5)*127)
        msgyl = int((results.pose_world_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].y *-1)*127)
        msgzl = int((results.pose_world_landmarks.landmark[mp_pose.PoseLandmark.LEFT_WRIST].z *-1)*127)       
        
        
        msgxr = int((results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].x)*127)
        msgyr = int((1 - results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].y)*127)
        msgzr = int((results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_WRIST].z*-1)*127)




        print(msgxl,msgyl,msgzl)
        print(msgxr,msgyr,msgzr)
        # msgx = random.randint(0,127)
        if (msgxr < 0):
            msgxr = 0
        if (msgxr > 127): 
            msgxr = 127

        if (msgyr < 0):
            msgyr = 0
        if (msgyr > 127): 
            msgyr = 127

        if (msgzr < 0):
            msgzr = 0
        if (msgzr > 127): 
            msgzr = 127
            
        if (msgxl < 0):
            msgxl = 0
        if (msgxl > 127): 
            msgxl = 127

        if (msgyl < 0):
            msgyl = 0
        if (msgyl > 127): 
            msgyl = 127

        if (msgzl < 0):
            msgzl = 0
        if (msgzl > 127): 
            msgzl = 127



        # print(dir(results.count))
        # print(results)
        # draw detected skeleton on the frameq
        mp_drawing.draw_landmarks(
            frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS)


        outport.send(mido.Message('control_change', control=20, value=msgxl))
        outport.send(mido.Message('control_change', control=21, value=msgyl))
        outport.send(mido.Message('control_change', control=22, value=msgzl))
        
        outport.send(mido.Message('control_change', control=23, value=msgxr))
        outport.send(mido.Message('control_change', control=24, value=msgyr))
        outport.send(mido.Message('control_change', control=25, value=msgzr))

        # show the final output 
        cv2.imshow('Output', frame)
    except:
        break
    if cv2.waitKey(1) == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()


