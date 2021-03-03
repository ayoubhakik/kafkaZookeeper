const {Kafka} =require('kafkajs')

const msg = process.argv[2];
run();
async function run(){
    try{
        const kafka =new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        })
        console.log("connecting")
        const producer=kafka.producer()
        console.log("connected")
        await producer.connect()
        const partition= msg[0] < "N" ? 0 : 1 ;
        //const partition=0;
        const result = await producer.send(
            {
                "topic":"TopicTest",
                "messages":[
                    {
                        "value":msg,
                        "partition":partition
                    }
                ]
            }
        )

        console.log('sent seccussfully '+JSON.stringify(result))
        producer.disconnect()
    }catch(ex){
        console.error('error running that '+ex)
    }
    finally{
        process.exit(0);
    }
}