const {Kafka} =require('kafkajs')
run();
async function run(){
    try{
        const kafka =new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        })
        console.log("connecting")
        const admin=kafka.admin()
        console.log("connected")
        await admin.connect()
        await admin.createTopics({
            "topics":[{
                "topic":"TopicTest",
                "numPartitions": 2
            }]
        })
        console.log("topics created")
        admin.disconnect()
    }catch(ex){
        console.error("error running that "+ex)
    }
    finally{
        process.exit(0);
    }
}