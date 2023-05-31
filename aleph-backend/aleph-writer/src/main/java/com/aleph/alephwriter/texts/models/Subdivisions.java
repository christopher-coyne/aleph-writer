package com.aleph.alephwriter.texts.models;

public class Subdivisions {

    public String div1;

    public String div2;
    public static class Subdivision {
        public String subtitle;
        public int div2;

        public Subdivision(String subtitle, int div2) {
            this.subtitle = subtitle;
            this.div2 = div2;
        }
    }

    public Subdivision[] divisions;

    public Subdivisions(String div1, String div2, Subdivision[] divisions) {
        this.div1 = div1;
        this.div2 = div2;
        this.divisions = divisions;
    }
}
