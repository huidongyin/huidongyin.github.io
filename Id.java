import java.util.Scanner;
import java.util.UUID;

public class Id  {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.next();
        //String str ="Servlet";
        System.out.println(UUID.nameUUIDFromBytes(str.getBytes()).toString());
        //Map map = new HashMap();
    }
}
