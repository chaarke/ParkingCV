import enum
import cv2 as cv
import yaml
import numpy as np

def draw_contours(image,
                  coordinates,
                  label,
                  font_color,
                  border_color=0x00ff00,
                  line_thickness=1,
                  font=cv.FONT_HERSHEY_SIMPLEX,
                  font_scale=0.5):
    cv.drawContours(image,
                         [coordinates],
                         contourIdx=-1,
                         color=border_color,
                         thickness=2,
                         lineType=cv.LINE_8)
    moments = cv.moments(coordinates)

    center = (int(moments["m10"] / moments["m00"]) - 3,
              int(moments["m01"] / moments["m00"]) + 3)

    cv.putText(image,
                    label,
                    center,
                    font,
                    font_scale,
                    font_color,
                    line_thickness,
                    cv.LINE_AA)



def apply(grayed, index, p, bounds, masks):
    coordinates = p

    rect = bounds[index]

    roi_gray = grayed[rect[1]:(rect[1] + rect[3]), rect[0]:(rect[0] + rect[2])]
    laplacian = cv.Laplacian(roi_gray, cv.CV_64F)

    #coordinates[:, 0] = coordinates[:, 0] - rect[0]
    #coordinates[:, 1] = coordinates[:, 1] - rect[1]

    status = np.mean(np.abs(laplacian * masks[index])) < 1.4

    return status


def analyze_frame(img, coords):
    bounds = []
    contours = []
    masks = []

    print(coords)

    for p in coords:
        p = np.array(p["coordinates"])
        rect = cv.boundingRect(p)

        new_coordinates = p.copy()
        new_coordinates[:, 0] = p[:, 0] - rect[0]
        new_coordinates[:, 1] = p[:, 1] - rect[1]

        mask = cv.drawContours(
            np.zeros((rect[3], rect[2]), dtype=np.uint8),
            [new_coordinates],
            contourIdx=-1,
            color=255,
            thickness=-1,
            lineType=cv.LINE_8)

        contours.append(p)
        bounds.append(rect)
        
        mask = mask == 255
        masks.append(mask)

    blurred = cv.GaussianBlur(img, (5, 5), 3)
    grayed = cv.cvtColor(blurred, cv.COLOR_BGR2GRAY)

    for i, c in enumerate(coords):
        status = apply(grayed, i, c, bounds, masks)

        print(c)
        draw_contours(img, str(c["id"] + 1), 0x0000ff, 0xff0000 if status else 0x00ff00)

    cv.imshow("win", img)
    cv.waitKey(0)

im = cv.imread("./test-images/unity-1.jpg")

with open("./data/unity-1.yml", "r") as data:
    pts = yaml.safe_load(data)

analyze_frame(im, pts)