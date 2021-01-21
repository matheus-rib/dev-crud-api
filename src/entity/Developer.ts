import { Column, Entity } from 'typeorm'
import { BaseEntity } from '../typeorm/BaseEntity'
import { DeveloperGenderType } from '../utils/enums'

@Entity('developers')
export class Developer extends BaseEntity {
  @Column({ name: 'nome', type: 'varchar' })
  name: string

  @Column({ name: 'sexo', type: 'enum', enum: DeveloperGenderType })
  gender: DeveloperGenderType

  @Column({ name: 'idade', type: 'int' })
  age: number

  @Column({ name: 'hobby', type: 'varchar' })
  hobby: string

  @Column({ name: 'datanascimento', type: 'timestamp' })
  dateOfBirth: Date
}
