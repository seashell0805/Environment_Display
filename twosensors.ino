SYSTEM_MODE(MANUAL);

int photoresistor = A0; // This is where your photoresistor is plugged in. The other side goes to the "power" pin (below).
int power = A5; // This is the other end of your photoresistor. The other side is plugged into the "photoresistor" pin (above).
int analogvalue1; // Here we are declaring the integer variable analogvalue, which we will use later to store the value of the photoresistor.

int temperatureSensor = D4; // This is where your photoresistor is plugged in. The other side goes to the "power" pin (below).
int analogvalue2; // Here we are declaring the integer variable analogvalue, which we will use later to store the value of the photoresistor.


// Next we go into the setup function.

void setup() {

    Serial.begin(9600);
    
    pinMode(D7, OUTPUT); 
    
    // First, declare all of our pins. This lets our device know which ones will be used for outputting voltage, and which ones will read incoming voltage.
    pinMode(photoresistor,INPUT);  // Our photoresistor pin is input (reading the photoresistor)
    pinMode(power,OUTPUT); // The pin powering the photoresistor is output (sending out consistent power)
    // Next, write one pin of the photoresistor to be the maximum possible, so that we can use this for power.
    digitalWrite(power,HIGH);

    
    pinMode(temperatureSensor, INPUT);


    // We are going to declare a Particle.variable() here so that we can access the value of the photoresistor from the cloud.
//    Particle.variable("analogvalue1", &analogvalue1, INT);
    // This is saying that when we ask the cloud for "analogvalue", this will reference the variable analogvalue in this app, which is an integer variable.

}


// Next is the loop function...

void loop() {

    // check to see what the value of the photoresistor is and store it in the int variable analogvalue
    analogvalue1 = analogRead(photoresistor);
    analogvalue2 = 1200-analogRead(temperatureSensor);
    
    Serial.print(analogvalue1);
    Serial.print(",");
    Serial.println(analogvalue2); //Note this is println, not print
    
    if(Serial.available()) {
        int i = Serial.parseInt(); 
        if(i % 2)
            digitalWrite(D7, HIGH);
        else
            digitalWrite(D7, LOW);
    }
    
    delay(500);
    
}



