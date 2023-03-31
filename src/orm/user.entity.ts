import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryColumn({
        name: 'id',
        type: 'uuid'
    })
    id: string;

    @Column({
        name: 'name',
        type: 'varchar'
    })
    name: string;

    @Column({
        name: 'password',
        type: 'varchar'
    })
    password: string;

    @Column({
        name: 'email',
        type: 'varchar'
    })
    email: string;
}