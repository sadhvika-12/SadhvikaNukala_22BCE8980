package connection;

import org.bson.Document;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Updates;

public class update {
	public static void main(String args[]){
		// Creating a Mongo client 
	    MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	    MongoDatabase database = mongoClient.getDatabase("myDb");

	    // Get the collection
	    MongoCollection<Document> collection = database.getCollection("sampleCollection");
	    
	    // Find all documents
	    collection.updateOne(Filters.eq("First_Name","Mahesh"),
	    Updates.set("e_mail", "maheshparashar@gmail.com"));
	    System.out.println("Document Updated");
	    System.out.println("***Updated Document***");
	    
	    //Select a particular document
	    FindIterable<Document> documents = collection.find(Filters.eq("First_Name","Mahesh"));
	    
	    for(Document document : documents){
	    	System.out.println(document);
	    }
	    
	    // update many
	    collection.updateMany(Filters.eq("First_Name","Mahesh"),
	    		Updates.combine(
	    				Updates.set("e_mail", "maheshparashar@gmail.com"),
	    				Updates.set("Last_Name", "Babu")));
	    
	  //Select a particular document
	    
	    for(Document document : documents){
	    	System.out.println(document);
	    }
	}
}
	    
