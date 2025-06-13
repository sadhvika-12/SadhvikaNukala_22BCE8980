package connection;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class DropCollection {
	public static void main(String args[]){
		// Creating a Mongo client 
	      MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	      
	    // get the database
	      MongoDatabase database = mongoClient.getDatabase("myDb");
	
	    // RetrDocument collection
	      MongoCollection<Document> collection = database.getCollection("sampleCollection");
	      
	      collection.drop();
	      System.out.println("Collection dropped");
	}
}
