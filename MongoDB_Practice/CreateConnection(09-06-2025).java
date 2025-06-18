package connection;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class CreateConnection {
	public static void main(String args[]){
		// Creating a Mongo client 
	      MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	      
	    // Connect to database
	      MongoDatabase database = mongoClient.getDatabase("myDb");
	      
	    // Create the collection
	      database.createCollection("sampleCollection2");
	      System.out.println("Collection created");
	}
}
