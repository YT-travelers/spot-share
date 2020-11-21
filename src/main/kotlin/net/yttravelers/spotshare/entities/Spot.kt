package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.*

@Entity
class Spot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    var spotId: Int? = null

    @Column(name = "name")
    var spotName: String? = null

    var url: String? = null

    var costExpectation: Int? = null

    var requiredMinutes: Int? = null

    var summary: String? = null

    @ElementCollection(fetch=FetchType.EAGER)
    @CollectionTable(
            name="spotImage"
    )
    @Column(name="imagePath")
    var imagePaths: MutableList<String> = mutableListOf()

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "spot")
    var routeDetails: MutableList<RouteDetail> = mutableListOf()
}