const {Kafka} =require('kafkajs')

run();
async function run(){
    try{
        const kafka =new Kafka({
            "clientId":"myapp",
            "brokers":["localhost:9092"]
        })
        console.log("connecting")
        const consumer=kafka.consumer({"groupId":"group_test"})
        await consumer.connect()
        console.log("connected")
        consumer.subscribe({
            //"partition":1,
            "topic":"TopicTest",
            "fromBeginning":true
        })
        await consumer.run({
            "eachMessage":async result=>{
                    console.log("message :"+result.message.value+" from partition :"+result.partition)
            }
        })

        

        
    }catch(ex){
        console.error('error running that '+ex)
    }
    
}