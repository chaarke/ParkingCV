function numVehicles = detectVehicles(imagefilename)
%DETECTVEHICLES Detects vehicles in the lot and outputs bounding boxes
%   Run "model = vehicleDetectorFasterRCNN OR vehicleDetectorYOLOv2" first.
    model = vehicleDetectorFasterRCNN;
    I = imread(imagefilename);
    [~,scores] = detect(model,I);
    scores = scores(scores > 0.70);
    numVehicles = length(scores);
end

