import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Company } from "./company"


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    description: string

    @ManyToOne(()=>Company, (Company)=>Company.products, {onDelete: "CASCADE"})
    company: Company;
}