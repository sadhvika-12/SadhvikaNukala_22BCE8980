package connection;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public class InsertDoc {
	public static void main(String[] args) {
	      // Creating a Mongo client 
	      MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	      MongoDatabase database = mongoClient.getDatabase("myDb");

	      // Get the collection
	      MongoCollection<Document> collection = database.getCollection("sampleCollection");

	      Document document = new Document("First_Name", "Mahesh")
	         .append("Last_Name", "Parashar")
	         .append("Date_Of_Birth", "1990-08-21")
	         .append("e_mail", "mahesh_parashar.123@gmail.com")
	         .append("phone", "9034343345");

	      collection.insertOne(document);
	      List<Document> documents = new ArrayList<>();

	      documents.add(new Document("First_Name", "Radhika")
	         .append("Last_Name", "Sharma")
	         .append("Date_Of_Birth", "1995-09-26")
	         .append("e_mail", "radhika_sharma.123@gmail.com")
	         .append("phone", "9000012345"));

	      documents.add(new Document("First_Name", "Rachel")
	         .append("Last_Name", "Christopher")
	         .append("Date_Of_Birth", "1990-02-16")
	         .append("e_mail", "Rachel_Christopher.123@gmail.com")
	         .append("phone", "9000054321"));

	      documents.add(new Document("First_Name", "Fathima")
	         .append("Last_Name", "Sheik")
	         .append("Date_Of_Birth", "1990-02-16")
	         .append("e_mail", "Fathima_Sheik.123@gmail.com")
	         .append("phone", "9000054321"));

	      collection.insertMany(documents);

	      System.out.println("Documents inserted.");
	}
}
