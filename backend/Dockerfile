FROM amazoncorretto:17
VOLUME /tmp
EXPOSE 8080
ADD ./target/ControleDeVendas-0.0.1-SNAPSHOT.jar controlevendasdocker.jar
ENTRYPOINT ["java","-jar","/controlevendasdocker.jar"]
