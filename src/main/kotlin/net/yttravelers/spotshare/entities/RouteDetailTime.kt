package net.yttravelers.spotshare.entities

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime
import javax.persistence.Table
import javax.persistence.*

@Entity
@Table(name = "routeDetailTime")
class RouteDetailTime {
    @Id
    var routeDetailId: Int? = null

    @JsonIgnore
    @OneToOne
    @JoinColumn(name = "routeDetailId")
    @MapsId
    lateinit var routeDetail: RouteDetail

    @Column(nullable = false)
    var scheduleDateTime: LocalDateTime? = null
}