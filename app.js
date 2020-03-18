//Set up screen
var internalScreenWidth = 230; //Actual screen width we do calculations with
var internalScreenHeight = 120; //Actual screen height we do calculations with

var scaleFactor = 5; //The amount we scale the frame generated using the actual window dimesions

//Setting the dimensions to fit scaled frame
screenWidth = internalScreenWidth * scaleFactor;
screenHeight = internalScreenHeight * scaleFactor;

backgroundColor = "white";

title = "Raycaster";

createCanvas();
setTitle();
getDownKeys(keyPush);

//Main loop
var playerX = 14.7;
var playerY = 5.09;
var playerA = 50;
var playerRotateSpeed = 0.6;
var playerMoveSpeed = 2;

var mapWidth = 16;
var mapHeight = 16;
var gameMap = "";
gameMap += "#########.......";
gameMap += "#...............";
gameMap += "#.......########";
gameMap += "#..............#";
gameMap += "#......##......#";
gameMap += "#......##......#";
gameMap += "#..............#";
gameMap += "###............#";
gameMap += "##.............#";
gameMap += "#......####..###";
gameMap += "#......#.......#";
gameMap += "#......#.......#";
gameMap += "#..............#";
gameMap += "#......#########";
gameMap += "#..............#";
gameMap += "################";

var FOV = pi()/2;
var depth = 16;
var deltaTime_ = 0;
var stepSize = 0.01;

wallImage = ['shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade', '#ffffff', 'shade', 'shade'];
var wallImageWidth = 32;
var wallImageHeight = 32;

//Key handling
function keyPush(evt)
{
    switch(evt.keyCode)
    {
        case 37:
            playerA -= playerRotateSpeed * deltaTime_;

            break;

        case 39:
            playerA += playerRotateSpeed * deltaTime_;

            break;

        case 38:
            playerX += sin(playerA) * playerMoveSpeed * deltaTime_;
			playerY += cos(playerA) * playerMoveSpeed * deltaTime_;
            
            if (gameMap[int(playerX) * mapWidth + int(playerY)] == '#')
			{
				playerX -= sin(playerA) * playerMoveSpeed * deltaTime_;
				playerY -= cos(playerA) * playerMoveSpeed * deltaTime_;
            }

            break;
        
        case 40:
            playerX -= sin(playerA) * playerMoveSpeed * deltaTime_;
			playerY -= cos(playerA) * playerMoveSpeed * deltaTime_;
            
            if (gameMap[int(playerX) * mapWidth + int(playerY)] == '#')
			{
				playerX += sin(playerA) * playerMoveSpeed * deltaTime_;
				playerY += cos(playerA) * playerMoveSpeed * deltaTime_;
            }

            break;
    }
}

function main()
{
    erase();
    deltaTime_ = deltaTime();

    for (var x = 0; x < internalScreenWidth; x++)
    {
        var rayAngle = (playerA - FOV / 2) + (x / internalScreenWidth) * FOV;
		var distanceToWall = 0;
        var hitWall = false;
        
        var eyeX = sin(rayAngle);
        var eyeY = cos(rayAngle);

        var sampleX;

        while (hitWall != true && distanceToWall < depth)
        {
            distanceToWall += stepSize;

            var testX = int(playerX +  eyeX * distanceToWall);
            var testY = int(playerY + eyeY * distanceToWall);

            if (testX < 0 || testX >= mapWidth || testY < 0 || testY >= mapHeight)
            {
                hitWall = true;
                distanceToWall = depth;
            }

            else
            {
                if (gameMap[testY * mapWidth + testX] == "#")
                {
                    hitWall = true;

                    var blockMidX = testX + 0.5;
                    var blockMidY = testY + 0.5;

                    var testPointX = playerX +  eyeX * distanceToWall;
                    var testPointY = playerY +  eyeY * distanceToWall;

                    var testAngle = atan2(testPointY - blockMidY, testPointX - blockMidX);

                    if (testAngle >= (pi() * -1) * 0.25 && testAngle < pi() * 0.25)
                    {
                        sampleX = testPointY - testY;
                    }
                    if (testAngle >= pi() * 0.25 && testAngle < pi() * 0.75)
                    {
                        sampleX = testPointX - testX;
                    }
                    if (testAngle < (pi() * -1) * 0.25 && testAngle >= (pi() * -1) * 0.75)
                    {
                        sampleX = testPointX - testX;
                    }
                    if (testAngle >= pi() * 0.75 || testAngle < (pi() * -1) * 0.75)
                    {
                        sampleX = testPointY - testY;
                    }
                }
            }
        }

        ceiling = (internalScreenHeight / 2) - internalScreenHeight / distanceToWall;
        floor = internalScreenHeight - ceiling;

        for (var y = 0; y < internalScreenHeight; y++)
        {
            y_ = y * scaleFactor;
            x_ = x * scaleFactor;

            if (y < ceiling)
            {
                drawPixelBlock(x_, y_, scaleFactor, scaleFactor, "#00BFFF");
            }

            else if (y > ceiling && y < floor)
            {
                if (distanceToWall < depth)
                {
                    var sampleY = (y - ceiling) / (floor - ceiling);
                    sampleY = sampleY - int(sampleY);
                    sampleX = sampleX - int(sampleX);

                    sampleX, sampleY = sample(sampleX, sampleY, wallImageWidth, wallImageHeight)

                    var shade = "";

                    if (wallImage[int(sampleY * wallImageWidth + sampleX)] == "shade")
                    {
                        if (distanceToWall <= depth / 4) {shade = "#ff9100";}
                        else if (distanceToWall <= depth / 3) {shade = "#e08916";}
                        else if (distanceToWall <= depth / 2) {shade = "#b57724";}
                        else if (distanceToWall <= depth) {shade = "#916427";}
                        else {shade = "#664d2b";}
                    }

                    else
                    {
                        shade = wallImage[int(sampleY * wallImageWidth + sampleX)];
                    }

                    drawPixelBlock(x_, y_, scaleFactor, scaleFactor, shade);
                }

                else
                {
                    drawPixelBlock(x_, y_, scaleFactor, scaleFactor, "#00BFFF");
                }
            }

            else
            {            
                drawPixelBlock(x_, y_, scaleFactor, scaleFactor, "#696969");
            }
        }
    }
}

//Run main
update(main, 10);
