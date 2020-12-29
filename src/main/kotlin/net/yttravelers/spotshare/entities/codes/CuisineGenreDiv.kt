package net.yttravelers.spotshare.entities.codes

import org.hibernate.annotations.Where
import javax.persistence.Entity

@Entity
@Where(clause = "division='CuisineGenreDiv'")
class CuisineGenreDiv: Code() {
}