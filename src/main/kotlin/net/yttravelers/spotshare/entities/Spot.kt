package net.yttravelers.spotshare.entities

import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.LocalDateTime
import javax.persistence.*


@Entity
class Spot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null

    var imagePath: String? = null

    var routeNumber: Int? = null

    var scheduleDateTime: LocalDateTime? = null

    var country: String? = null

    var spotName: String? = null

    var costExpectation: Int? = null

    var requiredTimeExpectation: Int? = null

    var favoritePoint: Int? = null

    var url: String? = null

    @Column(columnDefinition = "TEXT")
    var remark: String = ""

    @CreationTimestamp
    var createDateTime: LocalDateTime? = null

    @UpdateTimestamp
    var updateDateTime: LocalDateTime? = null
}